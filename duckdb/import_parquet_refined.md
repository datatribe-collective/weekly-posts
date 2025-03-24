# Importing and Analyzing Parquet Files with DuckDB and Streamlit

In this article, we tried to demonstrate how to create an interactive dashboard using DuckDB to analyze Parquet files with Streamlit. 
```python
products_df = con.execute("""SELECT * from read_parquet('products.parquet')""").df()
sales_df = con.execute("""SELECT * from read_parquet('sales.parquet')""").df()\
```
### Register DataFrames as tables
```python
con.register("sales_table", sales_df)
con.register("products_table", products_df)
```
And use queries to create a dashboard in streamlit
```python
# Create Streamlit dashboard
st.title("Sales Dashboard")

# Query 1: Total Revenue per Product
query1 = con.execute("""
    SELECT 
        p.product_name, 
        SUM(s.quantity * s.price) AS total_revenue
    FROM sales_table s
    JOIN products_table p ON s.product_id = p.product_id
    GROUP BY p.product_name
    ORDER BY total_revenue DESC
""").df()

st.subheader("Total Revenue per Product")
st.bar_chart(query1.set_index("product_name"))
```

### Run Streamlit App
You will get the following dashboard after running the streamlit app.
![streamlit_dashboard.png](streamlit_dashboard.png)

### Conclusion
This setup demonstrates the power of combining DuckDB with Streamlit for local analytics:
- Fast and efficient SQL analytics without a distributed system
- Direct Parquet file processing with minimal memory overhead
- Interactive visualizations through a user-friendly web interface
- Perfect for small to medium-sized datasets (up to several GBs)
- Zero-configuration analytics environment

### Github repo
You can find the complete code and data files in this [GitHub repository](https://github.com/datatribe-collective/weekly-posts/blob/main/duckdb/import_parquet.py)