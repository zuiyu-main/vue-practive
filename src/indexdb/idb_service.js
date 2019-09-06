import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
  const tblStudent = {
    name: 'Students',
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      gender: {
        dataType: DATA_TYPE.String,
        default: 'male'
      },
      country: {
        notNull: true,
        dataType: DATA_TYPE.String
      },
      city: {
        dataType: DATA_TYPE.String,
        notNull: true
      }
    }
  };
  const dataBase = {
    name: "Vue_Demo",
    tables: [tblStudent]
  };
  return dataBase;
};

export const initJsStore = async () => {
  const dataBase = getDatabase();
  return await connection.initDb(dataBase);
};
export const findByExample = async () => {
  var results = await connection.select({
    from: 'Students',
    where: {
      name: {
        $regex: /name:/i
      }
    }
  });
  //results will be array of objects.
  console.log('resrsersers:,', results);
  // return await connection.select({
  //   from: "Students",
  //   where: {
  //     name: {
  //       $regex: /111/
  //     }
  //   }
  // }).then(function (results) {
  //   //results will be array of objects.
  //   console.log('result:', results);
  // }).catch(function (error) {
  //   console.log('error:', error);
  // });
};
export const insert = async () => {
  const ar = []
  for (let i = 0; i < 1000; i++) {
    ar.push({
      name: 'name:' + i,
      country: 'country:' + i,
      city: 'city:' + i
    })
  }
  return await connection.insert({
    into: 'Students',
    values: ar,
    return: true
  })
}