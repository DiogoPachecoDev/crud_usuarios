import sql from 'mssql';

const dbSettings = {
  user: 'diogo',
  password: 'diogo1981',
  server: 'PC-DIOGO',
  database: 'dbconcredito',
  options: {
    encrypt: false
  }
};

async function connectToDb() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error('Error during database query:', error.message);
    throw { status: 500, message: 'Internal server error' };
  }
}

export default connectToDb;