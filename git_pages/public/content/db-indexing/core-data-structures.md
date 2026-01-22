# 2. Core Data Structures

Understanding the underlying data structure is critical because it dictates the performance characteristics (Read vs Write) of the database.

## 1. B-Trees and B+ Trees (The RDBMS Standard)
Used by: **MySQL (InnoDB), PostgreSQL, Oracle, SQL Server.**

### B-Tree
*   A self-balancing tree data structure.
*   Maintains sorted data.
*   Allows searches, sequential access, insertions, and deletions in logarithmic time.
*   **Key Feature:** Nodes can have more than 2 children (unlike Binary Search Trees). This keeps the tree "short" (low height), minimizing disk seeks.
*   **Structure:** Data can be stored in internal nodes and leaf nodes.

### B+ Tree (The Industry Standard)
An optimization of the B-Tree.
1.  **Data only at Leaves:** All actual records are stored in the leaf nodes. Internal nodes only store keys for routing.
2.  **Linked Leaves:** Leaf nodes are linked together in a linked list. This makes **Range Queries** (e.g., `SELECT * FROM users WHERE age BETWEEN 20 AND 30`) extremely efficient.

```text
       [ 30 ]
      /      \
  [ 10, 20 ]  [ 40, 50 ]  <-- Internal Nodes (Keys only)
     |    |      |    |
    [D1] [D2]   [D3] [D4] <-- Leaf Nodes (Data)
      \__/ \___/  \__/    <-- Linked List for Range Scans
```

**Complexity:**
*   Search: $O(\log N)$
*   Insert: $O(\log N)$
*   Delete: $O(\log N)$

---

## 2. LSM Trees (Log-Structured Merge-trees)
Used by: **Cassandra, RocksDB, LevelDB, Kafka, BigTable.**

Designed for **High Write Throughput**.
Instead of updating a tree structure in place (which causes random disk I/O), LSM trees treat writes as append-only logs.

### Architecture
1.  **MemTable (RAM):** Writes first go to an in-memory balanced tree (Red-Black or Skip List). This is fast (RAM speed).
2.  **SSTable (Disk):** When the MemTable is full, it is flushed to disk as an immutable **Sorted String Table (SSTable)**.
3.  **Compaction:** Over time, many SSTables accumulate. A background process merges them, removing deleted/overwritten data.

**Pros:**
*   Writes are sequential (Append-Only), which is incredibly fast on HDDs and efficient on SSDs.
*   Great for logging, time-series data.

**Cons:**
*   Reads can be slower (might need to check MemTable + multiple SSTables). (Mitigated by Bloom Filters).

---

## 3. Hash Indexes
Used by: **Redis, Memcached, MySQL (Memory Engine).**

*   Uses a Hash Table.
*   Maps a Key directly to a memory address or disk location.

**Pros:**
*   $O(1)$ lookup speed. Unbeatable for single-key lookups.

**Cons:**
*   **No Range Queries:** You cannot do `WHERE price > 100`. Since data is scattered based on hash, it's not sorted.
*   **Hash Collisions:** handled by chaining or open addressing.

---

## 4. Inverted Indexes
Used by: **Elasticsearch, Apache Lucene, Solr.**

The backbone of **Full-Text Search**.
Instead of mapping `RowID -> Data`, it maps `Content -> RowID`.

**Example:**
Document 1: "The quick brown fox"
Document 2: "The quick blue fox"

**Index:**
| Term | Document IDs |
| :--- | :--- |
| "quick" | [1, 2] |
| "brown" | [1] |
| "blue" | [2] |
| "fox" | [1, 2] |

When you search for "quick fox", the engine computes the intersection of `[1, 2]` AND `[1, 2]`.

---

## 5. Skip Lists
Used by: **Redis (Sorted Sets).**

A probabilistic alternative to balanced trees.
*   A series of linked lists in layers.
*   Bottom layer contains all elements.
*   Higher layers act as "express lanes" skipping over elements.

```text
L3:  1 --------------------> 10
L2:  1 --------> 5 --------> 10
L1:  1 -> 3 -> 5 -> 7 -> 9 -> 10
```
*   Average Search/Insert/Delete: $O(\log N)$.
*   Easier to implement concurrently than B-Trees.

```
