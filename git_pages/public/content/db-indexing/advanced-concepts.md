# 4. Advanced Indexing Concepts

Beyond standard B-Trees, specialized use cases require specialized indexes.

## 1. Spatial Indexes (Geospatial Data)
How do Uber, Yelp, or Google Maps efficiently find "Restaurants within 5km of me"?
Standard B-Trees fail here because latitude/longitude is 2-dimensional data, and B-Trees sort 1-dimensionally.

### Approaches:
*   **Quad-Trees:** Recursively dividing a 2D map into 4 quadrants.
    *   Node A: Top-Left
    *   Node B: Top-Right
    *   Node C: Bottom-Left
    *   Node D: Bottom-Right
    *   Good for in-memory structures.
*   **R-Trees (Rectangle Trees):** The standard for PostGIS.
    *   Groups nearby objects into minimum bounding rectangles.
    *   Hierarchy of overlapping rectangles.
*   **Geohashing (String-based):**
    *   Encodes Lat/Long into a string (e.g., "u4pruydqqvj").
    *   Characters represent precision. Shared prefixes = physical proximity.
    *   Allows using standard B-Trees for spatial queries!
*   **Google S2 (Hilbert Curves):**
    *   Maps 2D points onto a 1D space-filling curve.
    *   Used extensively by Google.

---

## 2. Bitmap Indexes
Best for **Low-Cardinality** data (columns with few unique values).
Example: `Gender (M/F)`, `Is_Active (T/F)`, `Marital_Status`.

### How it works:
Instead of a tree, it creates bit arrays for each distinct value.

Table:
| ID | Color |
| :--- | :--- |
| 1 | Red |
| 2 | Blue |
| 3 | Red |
| 4 | Green |

**Bitmap Index:**
*   **Red:**   `1 0 1 0`
*   **Blue:**  `0 1 0 0`
*   **Green:** `0 0 0 1`

**Query:** `SELECT * WHERE Color = 'Red' OR Color = 'Blue'`
**Operation:** Bitwise OR (`1 0 1 0` | `0 1 0 0` = `1 1 1 0`).
**Result:** Rows 1, 2, 3.

**Pros:** Extremely fast bitwise operations. Small storage.
**Cons:** terrible for write-heavy systems (updating the bitmap is expensive due to locking).

---

## 3. Bloom Filters
A probabilistic data structure used to test whether an element is a member of a set.
*   **Result:** "Possibly in set" or "Definitely not in set".
*   **False Positives:** Possible.
*   **False Negatives:** Impossible.

### Use Case in Databases (LSM Trees)
In Cassandra/RocksDB, before searching a massive SSTable on disk for a key:
1.  Check the in-memory Bloom Filter.
2.  If it says "Definitely not", we SKIP the disk read entirely.
3.  If it says "Possibly", we do the disk read.

This saves massive amounts of unnecessary disk I/O.
