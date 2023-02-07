import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import Moment from '../time/Moment';

function PostTable({ posts }) {
  console.log('PostTable', posts);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '40px' }}>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell sx={{ width: '80px' }}>작성자</TableCell>
            <TableCell sx={{ width: '120px' }}>작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="post">
                {post.id}
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.writer}</TableCell>
              <TableCell>
                <Moment date={post.createdAt} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PostTable;
