import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const connectionString =
      process.env['DATABASE_URL'] ??
      'postgres://postgres:postgres@localhost:5432/nexora';
    this.pool = new Pool({ connectionString });
  }

  query<T extends QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
