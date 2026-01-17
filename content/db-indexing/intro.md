# Database Indexing for System Design

This guide covers the essential concepts of database indexing required for High-Level Design (HLD) interviews and real-world system architecture.

## 1. Fundamentals of Indexing
*   **What is an Index?** (Analogy: Book index vs. scanning every page)
*   **The Trade-off:** Improved Read Latency vs. Increased Write Latency & Storage Cost.
*   **Disk I/O:** Understanding pages/blocks and how indexes minimize disk access.

## 2. Core Data Structures
Understanding the underlying structures is crucial for choosing the right database.
*   **B-Trees and B+ Trees**
    *   Standard for RDBMS (MySQL, PostgreSQL).
    *   Optimized for read-heavy workloads and range queries.
    *   Difference between B-Tree and B+ Tree.
*   **LSM Trees (Log-Structured Merge-trees)**
    *   Standard for heavy write workloads (Cassandra, RocksDB, Kafka).
    *   MemTable, SSTables, Compaction.
*   **Hash Indexes**
    *   O(1) lookups but no range queries.
    *   Used in Redis, memory-optimized tables.
*   **Inverted Indexes**
    *   Powering Search Engines (Elasticsearch, Lucene).
    *   Mapping terms to document IDs.
*   **Skip Lists**
    *   Probabilistic data structure (used in Redis Sorted Sets).

## 3. Types of Indexes
*   **Clustered vs. Non-Clustered (Secondary) Indexes**
    *   Clustered: Data sits in the leaf nodes (only one per table).
    *   Non-Clustered: Pointers to the actual data row.
*   **Composite (Multi-Column) Indexes**
    *   Importance of column order.
    *   **Concatenation keys**.
*   **Covering Indexes**
    *   Queries satisfied entirely by the index (no need to look up the main table).
*   **Unique Indexes**
    *   Enforcing data integrity.

## 4. Advanced Indexing Concepts
*   **Spatial Indexes** (For Location-based services like Uber/Maps)
    *   Quad-Trees.
    *   Google S2 (Hilbert curves).
    *   R-Trees.
    *   Geohashes.
*   **Bitmap Indexes**
    *   Efficient for low-cardinality data (e.g., Gender, Status boolean).
*   **Bloom Filters**
    *   Probabilistic structure to quickly check if an element *might* exist (used to avoid expensive disk lookups in LSM trees).

## 5. Optimization & Query Performance
*   **Cardinality & Selectivity**
    *   High cardinality (UUIDs) vs Low cardinality (Boolean).
    *   When *not* to use an index.
*   **The "Leftmost Prefix" Rule**
    *   How composite indexes are utilized in queries.
*   **Write Amplification**
    *   Cost of updating indexes on every INSERT/UPDATE.
*   **Index Fragmentation**
    *   Impact on performance and maintenance.

## 6. Database Specific Implementations
*   **PostgreSQL**: GIN (Generalized Inverted Index), GiST (Generalized Search Tree), BRIN (Block Range Index).
*   **MySQL (InnoDB)**: Primary key clustering architecture.
*   **MongoDB**: Single field, Compound, Multikey (array) indexes.

## 7. System Design Scenarios (Interview Prep)
*   **Scenario 1:** Designing a key-value store (Hash Index vs LSM Tree).
*   **Scenario 2:** Designing a Text Search service (Inverted Index).
*   **Scenario 3:** Designing "Nearby Friends" (Spatial Indexing/Geohashing).
*   **Scenario 4:** Analytics on massive logs (Columnar storage + Bitmap indexes).

## Resources for Deep Dive
*   *Database Internals* by Alex Petrov.
*   *Designing Data-Intensive Applications* by Martin Kleppmann (Chapter 3).
