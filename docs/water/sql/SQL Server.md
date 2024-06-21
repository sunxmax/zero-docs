# SQL Server

## 常见问题

### SQL 执行时间

```sql
-- 查询最近执行的耗时SQL，包括平均时间
SELECT TOP 10
    qs.creation_time,
    qs.last_execution_time,
    qs.execution_count,
    qs.total_worker_time AS total_cpu_time,
    qs.total_elapsed_time / 1000 AS total_elapsed_time_ms,
    (qs.total_elapsed_time / qs.execution_count) / 1000 AS avg_elapsed_time_ms,
    SUBSTRING(st.text, (qs.statement_start_offset/2) + 1, 
              ((CASE qs.statement_end_offset 
                  WHEN -1 THEN DATALENGTH(st.text)
                  ELSE qs.statement_end_offset 
                END - qs.statement_start_offset)/2) + 1) AS sql_text,
    DB_NAME(st.dbid) AS database_name,
    OBJECT_NAME(st.objectid, st.dbid) AS object_name,
    qp.query_plan
FROM
    sys.dm_exec_query_stats AS qs
CROSS APPLY
    sys.dm_exec_sql_text(qs.sql_handle) AS st
CROSS APPLY
    sys.dm_exec_query_plan(qs.plan_handle) AS qp
WHERE
    qs.last_execution_time > DATEADD(HOUR, -1, GETDATE()) -- 过去一小时执行的查询
ORDER BY
    qs.total_elapsed_time DESC;

```

::: details 解释

- `sys.dm_exec_query_stats`：存储了有关查询执行的统计信息。
- `sys.dm_exec_sql_text`：提供了SQL文本。
- `sys.dm_exec_query_plan`：提供了查询计划。
- `qs.creation_time`：查询首次执行的时间。
- `qs.last_execution_time`：查询最后执行的时间。
- `qs.execution_count`：查询执行的次数。
- `qs.total_worker_time`：CPU时间。
- `qs.total_elapsed_time`：总的执行时间（以毫秒为单位）。
- `SUBSTRING(st.text, (qs.statement_start_offset/2) + 1, ((CASE qs.statement_end_offset WHEN -1 THEN DATALENGTH(st.text) ELSE qs.statement_end_offset END - qs.statement_start_offset)/2) + 1) AS sql_text`：提取查询的SQL文本。
- `DB_NAME(st.dbid)`：数据库名称。
- `OBJECT_NAME(st.objectid, st.dbid)`：对象名称。
- `qp.query_plan`：查询计划。
- `DATEADD(HOUR, -1, GETDATE())`：用于筛选过去一小时执行的查询，可以根据需要修改时间范围。
- `qs.total_elapsed_time / qs.execution_count`：计算总的执行时间除以执行次数，得到平均执行时间。
- `/ 1000 AS avg_elapsed_time_ms`：将平均执行时间转换为毫秒显示。

:::

### 检查表的物理设计

确保表的物理设计是最优的，如页分配和碎片等。

```sql
-- 检查表的碎片
DBCC SHOWCONTIG('TABLE_NAME');

-- 重组索引（轻度碎片，通常低于30%）
ALTER INDEX ALL ON TABLE_NAME REORGANIZE;

-- 重建索引（高度碎片，通常超过30%）
ALTER INDEX ALL ON TABLE_NAME REBUILD;
```

::: details 检查碎片

检查碎片的目的是确保表或索引的数据页在磁盘上尽可能连续地存储，从而提高数据访问和检索的效率。数据碎片化会导致性能下降，因为SQL Server可能需要进行更多的磁盘I/O操作来读取分散的数据页。

**目的**
- 提高查询性能：连续的数据页可以减少磁盘I/O操作，从而提高查询的响应速度。
- 优化存储：减少不必要的磁盘空间浪费，使得数据存储更加高效。
- 降低维护成本：减少频繁的索引重建或重组操作，从而降低数据库的维护成本。
:::
