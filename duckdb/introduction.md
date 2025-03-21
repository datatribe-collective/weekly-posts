Getting Started with DuckDB in Python

DuckDB is an embedded, high-performance SQL database management system designed for analytical workloads. It integrates seamlessly with Python, allowing you to execute SQL queries directly within your Python environment.

Installation

First, install the DuckDB Python package using pip:

```bash
pip install duckdb
```
Example Usage

Here's a simple example of creating a DuckDB connection, executing a query, and fetching the results:

```python
import duckdb
conn = duckdb.connect()
conn.execute("CREATE TABLE test (a INTEGER, b VARCHAR)")
conn.execute("INSERT INTO test VALUES (1, 'foo'), (2, 'bar'), (3, 'baz')")
result = conn.execute("SELECT * FROM test").fetchall()

for row in result:
    print(row)
```
This will output:

```
(1, 'foo')
(2, 'bar')
(3, 'baz')
```
#close the connection
```bash
conn.close()
```