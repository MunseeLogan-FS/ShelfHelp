# Use a lightweight, multi-architecture Postgres image
FROM postgres:16.2-alpine

# Optional: Set a default timezone (change if needed)
ENV TZ=UTC

# Optional: Copy custom Postgres config (if you add one later)
# COPY ./postgres.conf /etc/postgresql/postgresql.conf

# Initialization scripts go in this folder.
# Anything .sql, .sql.gz, or .sh will run on first container startup.
COPY ./initdb /docker-entrypoint-initdb.d/

# Expose Postgres default port
EXPOSE 5432

# Default command
CMD ["postgres"]
