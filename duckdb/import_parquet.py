import duckdb
import streamlit as st
import pandas as pd
import pyarrow as pa

con = duckdb.connect()

products_df = con.execute("""SELECT * from read_parquet('/Users/chanukya/GIT/weekly-posts/sample_data/products.parquet')""").df()

sales_df = con.execute("""SELECT * from read_parquet('/Users/chanukya/GIT/weekly-posts/sample_data/sales.parquet')""").df()

con.register("sales_table", sales_df)
con.register("products_table", products_df)

# Title
st.title("Sales Dashboard")

# Total Revenue per Product
query1 = con.execute("""
    SELECT p.product_name, SUM(s.quantity * s.price) AS total_revenue
    FROM sales_table s
    JOIN products_table p
    ON s.product_id = p.product_id
    GROUP BY p.product_name
    ORDER BY total_revenue DESC
""").df()

st.subheader("Total Revenue per Product")
#st.bar_chart(query1.set_index("product_name"))
st.bar_chart(query1.set_index("product_name"), height=200, use_container_width=True)

# Best-Selling Product
query2 = con.execute("""
    SELECT p.product_name, SUM(s.quantity) AS total_quantity_sold
    FROM sales_table s
    JOIN products_table p
    ON s.product_id = p.product_id
    GROUP BY p.product_name
    ORDER BY total_quantity_sold DESC
    LIMIT 1
""").df()

st.subheader("Best-Selling Product")
st.write(query2)

# Daily Sales Revenue
query4 = con.execute("""
    SELECT sale_date, SUM(quantity * price) AS daily_revenue
    FROM sales_table
    GROUP BY sale_date
    ORDER BY sale_date
""").df()

st.subheader("Daily Sales Revenue")
st.line_chart(query4.set_index("sale_date"))