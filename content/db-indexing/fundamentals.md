# 1. Fundamentals of Indexing

## What is an Index?
An database index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space.

### The Library Analogy
Imagine a library with 100,000 books.
*   **Without an Index (Full Table Scan):** To find a book by "George Orwell", you have to walk through every single aisle and check every book until you find it. This is $O(N)$.
*   **With an Index:** You go to the catalog computer (the index), type "George Orwell", and it tells you exactly which Aisle, Shelf, and Row the book is located. You go directly there. This is $O(\log N)$ or $O(1)$ depending on the structure.

---

## The Core Trade-off
Indexing is not free. It is a classic system design trade-off.

| Feature | Impact | Explanation |
| :--- | :--- | :--- |
| **Read Latency** | 🟢 **Decreases** | Queries are significantly faster because fewer disk pages need to be scanned. |
| **Write Latency** | 🔴 **Increases** | Every `INSERT`, `UPDATE`, or `DELETE` requires updating the table **AND** the index data structure. |
| **Storage Cost** | 🔴 **Increases** | Indexes take up disk space (and RAM for caching). |

**Rule of Thumb:**
*   Use indexes heavily on **Read-Heavy** systems (e.g., Twitter feed, Product catalog).
*   Use indexes sparingly on **Write-Heavy** systems (e.g., IoT sensor logs, Stock ticker ingestion).

---

## Disk I/O: The Bottleneck
Database performance is largely about minimizing **Disk I/O** (Input/Output). Accessing data from RAM is nanoseconds; accessing from Disk is milliseconds (100,000x slower).

### How Databases Store Data
Databases store data in **Pages** (or Blocks), typically 4KB, 8KB, or 16KB in size.
*   A page might hold 50 rows of user data.
*   To read 1 specific user, the DB must read the *entire* 8KB page into memory.

### How Indexes Help
Indexes are also stored in pages. However, index pages are much smaller and denser because they only contain:
1.  The Key (e.g., `user_id`)
2.  A Pointer (to the actual data page)

By fitting many keys into a single index page, the database can traverse the index tree with very few disk reads to find the exact location of the full record.

```mermaid
graph TD
    A[Root Node (Index Page)] --> B[Internal Node]
    A --> C[Internal Node]
    B --> D[Leaf Node (Index Page)]
    B --> E[Leaf Node (Index Page)]
    C --> F[Leaf Node (Index Page)]
    
    D -.-> DataPage1[Data Page (Disk)]
    E -.-> DataPage2[Data Page (Disk)]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style DataPage1 fill:#bbf,stroke:#333,stroke-width:2px
```
