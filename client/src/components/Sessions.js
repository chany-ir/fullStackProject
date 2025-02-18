import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Service from '../AuthService';

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  // useEffect(() => {
  //   Service.getPrivate().then((data) => {
  //       console.log('sessions', data)
  //     setSessions(data);
  //   });
  // }, []);
  useEffect(() => {
    console.log("try to go to sessiens");
    Service.getPrivate()
      .then((data) => {
        console.log("sessions", data);
       
        // אם הנתונים אינם מערך, השתמש במערך ריק
        if (Array.isArray(data)) {
          setSessions(data);
        } else {
          setSessions([]);  // אם הנתונים אינם מערך, לא עושים כלום
        }
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setSessions([]);  // במקרה של שגיאה, נוודא שהמערך נשאר ריק
      });
  }, []);
  
  return (
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>קוד מזהה </TableCell>
            <TableCell> קוד התחברות </TableCell>
            <TableCell>תאריך ושעה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions && sessions.length > 0 ? (
            sessions.map((row) => (
              <TableRow
                key={row.number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
              
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                אין נתונים להציג
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}