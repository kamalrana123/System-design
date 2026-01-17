# 5. Optimization & Query Performance

Having indexes is not enough; using them correctly is the real skill.

## 1. Cardinality & Selectivity
*   **Cardinality:** The number of unique values in a column.
    *   `UUID`: High Cardinality (All unique).
    *   `Status (Active/Inactive)`: Low Cardinality (2 values).
*   **Selectivity:** The percentage of rows a query retrieves.

**Rule:** Indexes work best for **High Cardinality** columns where the query is **Highly Selective** (returns < 5-10% of rows).
If a query returns 50% of the table (e.g., `SELECT * FROM users WHERE gender = 'M'`), the DB optimizer will often **ignore** the index and do a Full Table Scan because random disk I/O is slower than sequential read for large data sets.

---

## 2. The "Leftmost Prefix" Rule
Applies to Composite Indexes.
If you have `INDEX(A, B, C)`, the index can support queries on:
*   `A`
*   `A, B`
*   `A, B, C`

It CANNOT efficiently support queries on:
*   `B` (A is missing)
*   `C` (A and B are missing)
*   `B, C` (A is missing)
*   `A, C` (It can use the index for A, but C is not sorted within just A, so it's less efficient).

**Analogy:**
If a dictionary is sorted by (Last Name, First Name).
*   Find "Williams, John": Easy.
*   Find "Williams, *": Easy.
*   Find "*, John": Impossible (Need to scan every page).

---

## 3. Write Amplification
Indexes make reads fast but writes slow.
*   On `INSERT`: The DB must write the data page + update *every single index* on that table.
*   On `UPDATE`: If an indexed column changes, the index tree must be rebalanced.
*   **Design Tip:** Don't index every column. Only index columns used in `WHERE`, `JOIN`, or `ORDER BY` clauses.

---

## 4. Index Fragmentation
Over time, as records are inserted, deleted, and updated, the index pages on disk become fragmented (lots of empty space in pages, non-sequential storage).
*   **Consequence:** More disk I/O required to read the same amount of data.
*   **Fix:** Regularly run `OPTIMIZE TABLE` (MySQL) or `VACUUM` / `REINDEX` (PostgreSQL) to rebuild indexes.
