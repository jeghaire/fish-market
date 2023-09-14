'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import mysql from 'mysql';

const DataGrabber = (): JSX.Element => {
  const router = useRouter();
  const [dbConnection, setDbConnection] = useState<mysql.Connection | null>(
    null
  );

  // Database connection parameters.
  const dbConfig: mysql.ConnectionConfig = {
    host: '', // Put your configuration here.
    user: '', // Put your configuration here.
    password: '', // Put your configuration here.
    database: '' // Put your configuration here.
  };

  // Database queries.
  const insertGrabbedRequest =
    'INSERT INTO grabbed_request (request_method, ip_remote_addr, ip_forwarded_for, remote_port, user_agent) VALUES (?, ?, ?, ?, ?)';
  const insertGrabbedContent =
    'INSERT INTO grabbed_content (grabbed_content_fk, content_type, content_key, content_value) VALUES (?, ?, ?, ?)';

  useEffect(() => {
    // Establishing database connection.
    const connection = mysql.createConnection(dbConfig);
    connection.connect((error) => {
      if (error) {
        console.error('Error in connecting to the database!');
      } else {
        setDbConnection(connection);
      }
    });

    return () => {
      // Closing database connection when component unmounts.
      if (dbConnection) {
        dbConnection.end();
      }
    };
  }, []);

  const handleDataGrab = (): void => {
    // Checking the presence of data.
    if (
      Object.keys(router.query).length === 0 &&
      Object.keys(router.body).length === 0
    ) {
      console.log('No data!');
    } else {
      // Determining the HTTP request method.
      let requestMethod = 'UNKNOWN';
      if (typeof window !== 'undefined' && window.location) {
        requestMethod = window.location.method;
      }

      // Determining the remote IP addresses.
      const ipRemoteAddr =
        router?.req?.headers['x-forwarded-for'] ||
        router?.req?.connection?.remoteAddress ||
        null;
      const ipForwardedFor = router?.req?.headers['x-forwarded-for'] || null;

      // Determining the remote port.
      const remotePort = router?.req?.socket?.remotePort || null;

      // Determining the user agent.
      const userAgent = router?.req?.headers['user-agent'] || null;

      // Inserting grabbed request data into the database.
      dbConnection?.query(
        insertGrabbedRequest,
        [requestMethod, ipRemoteAddr, ipForwardedFor, remotePort, userAgent],
        (error, result) => {
          if (error) {
            console.error('Error in inserting request data into database!');
          } else {
            const requestId = result.insertId;

            // Inserting grabbed content data into the database.
            const headers = router?.req?.headers || {};
            const dataContent: { [key: string]: any } = {
              QUERY_PARAMETER: router.query,
              BODY_PARAMETER: router.body,
              COOKIE: headers.cookie,
              HEADER: headers
            };

            Object.entries(dataContent).forEach(
              ([dataContentType, dataContentArray]) => {
                if (Object.keys(dataContentArray).length > 0) {
                  Object.entries(dataContentArray).forEach(([key, value]) => {
                    dbConnection?.query(
                      insertGrabbedContent,
                      [requestId, dataContentType, key, value],
                      (error) => {
                        if (error) {
                          console.error(
                            'Error in inserting request content into database!'
                          );
                        }
                      }
                    );
                  });
                }
              }
            );
          }
        }
      );
    }
  };

  return (
    <div>
      <button onClick={handleDataGrab}>Grab Data</button>
    </div>
  );
};

export default DataGrabber;
