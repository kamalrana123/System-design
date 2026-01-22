# 3. Types of Indexes

Once you understand the data structures (B-Tree, Hash, etc.), you need to understand how databases expose these as "Index Types" to the user.

## 1. Clustered vs. Non-Clustered Indexes
This is the most important distinction in RDBMS physical storage.

### Clustered Index (The Physical Sort)
*   **Concept:** The table rows *themselves* are stored in the leaf nodes of the index. The table *is* the index.
*   **Constraint:** Since data can only be physically sorted in one way, there can be **only one** Clustered Index per table.
*   **Default:** Usually the Primary Key (PK).
*   **Benefit:** Retrieving a row by PK is extremely fast (direct access to data).

### Non-Clustered (Secondary) Index
*   **Concept:** A separate structure that stores the Key + a Pointer (usually the PK) to the actual data row.
*   **Constraint:** You can have many non-clustered indexes.
*   **Cost:** "Lookups" or "Bookmark Lookups".
    1.  Search the Secondary Index to find the PK.
    2.  Use the PK to search the Clustered Index to get the full row. (This double-lookup is slightly slower).

---

## 2. Composite (Multi-Column) Indexes
An index on multiple columns, e.g., `INDEX(last_name, first_name)`.

### How it works (Concatenation)
It essentially sorts by the first column, then the second.
Like a phone book sorted by `Last Name`, then `First Name`.

### The Importance of Order
For `INDEX(A, B, C)`:
*   ✅ Query `WHERE A=1 AND B=2` -> Fast (Uses Index)
*   ✅ Query `WHERE A=1` -> Fast (Uses Index)
*   ❌ Query `WHERE B=2` -> **Slow** (Full Table Scan). The index is sorted by A first. B is only sorted *within* A. This violates the **Leftmost Prefix Rule**.

---

## 3. Covering Indexes
A powerful optimization technique.
A **Covering Index** is an index that contains (covers) *all* the columns required by the query.

**Example:**
Table: `Users (id, name, age, city)`
Index: `INDEX(age, name)`

**Query:**
```sql
SELECT name FROM Users WHERE age = 25;
```

**Execution:**
1.  The DB goes to the `(age, name)` index.
2.  It finds `age=25`.
3.  It needs `name`. `name` is right there in the index entry!
4.  **Result:** It returns the answer directly from the index. It **never** touches the main table (Clustered Index). This is incredibly fast.

---

## 4. Unique Indexes
*   Ensures that values in the indexed column are unique.
*   Functionally similar to a standard B-Tree index but adds a constraint check on Insert/Update.
*   Example: `Email` field in a Users table.

---

## 5. Partial / Filtered Indexes
*   An index created only on a subset of rows.
*   **Example:** `CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';`
*   **Benefit:** Smaller index size, faster updates. Great if you only ever query "active" users.
