import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// database
const adapter = new FileSync('db.json')
export const db = low(adapter)

// Set some defaults
db.defaults({ replies: [] })
.write()

