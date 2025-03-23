## Getting Started with DuckDB in Python

DuckDB is an embedded, high-performance SQL database management system designed for analytical workloads. It seamlessly integrates with Python, allowing you to execute SQL queries directly within your Python environment. DuckDB runs on a single machine and efficiently utilizes multi-core processing, making it an excellent choice for fast, in-memory analytics.

### Installation

First, install the DuckDB Python package using pip:

```bash
pip install duckdb
```
### Example Usage

Here's a simple example of creating a DuckDB connection, executing a query, and fetching the results:

```python
import duckdb
conn = duckdb.connect()
conn.execute("CREATE TABLE test (a INTEGER, b VARCHAR)")
conn.execute("INSERT INTO test VALUES (1, 'foo'), (2, 'bar'), (3, 'baz')")
result = conn.execute("SELECT * FROM test").fetchall()

for row in result:
    print(row)

# Close the connection
conn.close()
```

### Output

```
(1, 'foo')
(2, 'bar')
(3, 'baz')
```
### Conclusion
DuckDB is a powerful yet lightweight analytical database, ideal for small to medium-sized datasets. It eliminates the need for complex distributed systems while providing fast, efficient query execution within Python.