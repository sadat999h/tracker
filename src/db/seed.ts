/* Development-only seed entrypoint. This must never run in a production build. */
if (process.env.NODE_ENV === 'production') {
  throw new Error('DAYMARK seed is disabled in production.');
}

console.info('DAYMARK development seed scaffold is ready. Phase 1 will add fixture inserts.');
