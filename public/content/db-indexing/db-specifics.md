# 6. Database Specific Implementations

Every database engine implements indexing slightly differently.

## 1. PostgreSQL
Postgres provides the richest set of index types.
*   **B-Tree:** Default.
*   **Hash:** Fast for equality only.
*   **GiST (Generalized Search Tree):** Used for geometric data, text search.
*   **GIN (Generalized Inverted Index):** Best for JSONB, Arrays, and Full-Text Search.
*   **BRIN (Block Range Index):** Extremely small indexes for very large tables where data is naturally sorted (e.g., TimeSeries logs). It stores the min/max value for a *range* of pages.

## 2. MySQL (InnoDB Engine)
*   **Everything is a B+ Tree.**
*   **Clustered Index:** The Primary Key *is* the table.
*   **Secondary Indexes:** The leaves contain the Primary Key value.
*   **Adaptive Hash Index:** InnoDB automatically builds hash indexes in memory for frequently accessed pages. You cannot manually create them on disk.

## 3. MongoDB
*   **B-Tree:** Default for scalar values.
*   **Multikey Index:** Automatically created if you index an Array field. It creates an index entry for *each* element in the array.
    *   Doc: `{ tags: ["A", "B"] }` -> Index Entries: `A`, `B`.
*   **Geospatial:** `2dsphere` for earth-like spheres.
*   **Text:** Basic text search (tokenization, stop words).

## 4. Cassandra / ScyllaDB
*   **LSM Tree Based:** Optimized for writes.
*   **Partition Key:** Determines which node stores the data.
*   **Clustering Key:** Determines how data is sorted *within* the partition (on disk).
*   **Secondary Indexes:** Generally discouraged in Cassandra as they require querying *every* node (scatter-gather), which is slow.
