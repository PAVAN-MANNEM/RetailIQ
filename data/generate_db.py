# import pandas as pd
# import json

# # Load the superstore dataset
# df = pd.read_csv("Retail Sales Analytics & Business Insights Dashboard/data/cleaned_superstore.csv")

# prod_search_map = {}

# # Group by Product_Name to aggregate stats
# for name, group in df.groupby('Product_Name'):
#     p_id = group['Product_ID'].iloc[0]
#     cat = group['Category'].iloc[0]
#     subcat = group['Sub_Category'].iloc[0]
#     sales = float(group['Sales'].sum())
#     profit = float(group['Profit'].sum())
#     orders = int(group['Order_ID'].nunique())
    
#     # Cost calculation
#     cost = sales - profit
    
#     # Top Ordered Customer
#     top_cust_row = group.groupby('Customer_Name')['Sales'].sum().sort_values(ascending=False)
#     top_customer = top_cust_row.index[0] if not top_cust_row.empty else "Unknown"
    
#     # Latest 5 order dates
#     order_dates = sorted(group['Order_Date'].unique().tolist(), reverse=True)[:5]
    
#     # Clean up double quotes for JSON safety
#     clean_name = name.replace('"', '').replace("'", "")
    
#     prod_search_map[clean_name] = {
#         "id": p_id,
#         "name": clean_name,
#         "category": cat,
#         "subCategory": subcat,
#         "sales": sales,
#         "profit": profit,
#         "orders": orders,
#         "cost": cost,
#         "orderDates": order_dates,
#         "topCustomer": top_customer
#     }

# # Convert map to a list and save to JSON
# prod_search_list = list(prod_search_map.values())

# with open('product_search_database.json', 'w') as f:
#     json.dump(prod_search_list, f)

# print(f"Success! product_search_database.json created with {len(prod_search_list)} records.")





import pandas as pd
import json

# Load the raw dataset
df = pd.read_csv("Retail Sales Analytics & Business Insights Dashboard/data/cleaned_superstore.csv")

def get_top_n(group, col, n=5):
    # Sums sales for the given column and returns top N names
    return group.groupby(col)['Sales'].sum().nlargest(n).index.tolist()

geo_db = []

# Helper to process and aggregate data across different geographic levels
def process_groups(groupby_cols, type_name):
    for name, group in df.groupby(groupby_cols):
        if isinstance(name, tuple):
            entity_name = name[-1]
            # Create a location breadcrumb (e.g. "Seattle, Washington, United States, West")
            loc = ", ".join(reversed([str(n) for n in name]))
        else:
            entity_name = name
            loc = str(name)
            
        sales = float(group['Sales'].sum())
        profit = float(group['Profit'].sum())
        top_prods = get_top_n(group, 'Product_Name')
        top_custs = get_top_n(group, 'Customer_Name')

        clean_name = str(entity_name).replace('"', '').replace("'", "")
        
        geo_db.append({
            "id": f"{type_name}-{clean_name}-{loc}",
            "name": clean_name,
            "type": type_name,
            "location": loc,
            "sales": sales,
            "profit": profit,
            "topProducts": [str(p).replace('"', '').replace("'", "") for p in top_prods],
            "topCustomers": [str(c).replace('"', '').replace("'", "") for c in top_custs]
        })

# Aggregate all 4 hierarchical levels
process_groups(['Region'], 'Region')
process_groups(['Region', 'Country'], 'Country')
process_groups(['Region', 'Country', 'State'], 'State')
process_groups(['Region', 'Country', 'State', 'City'], 'City')

# Save to JSON
with open('geo_search_database.json', 'w') as f:
    json.dump(geo_db, f)

print(f"Success! geo_search_database.json created with {len(geo_db)} records.")