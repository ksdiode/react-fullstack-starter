import { Box, Pagination } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useBlog } from '../../store/blog';
import PostTable from '../../components/blog/PostTable';

const BlogList = () => {
  const [page, setPage] = useState(1);
  const { posts, status } = useSelector((state) => state.blog);
  const { getList } = useBlog();
  useEffect(() => {
    getList(page);
  }, [page]);

  // const posts = useMemo([page])
  if (status !== 'fulfilled') return;

  console.log('Blog');
  console.log(posts);
  return (
    <div>
      <h2>Blog</h2>
      <PostTable posts={posts} status={status} />

      <Box display="flex" justifyContent="center" alignItems="center">
        <Pagination
          count={12}
          value={page ? page : 1}
          showFirstButton
          showLastButton
          onChange={(_, page) => setPage(page)}
        />
      </Box>
    </div>
  );
};

export default BlogList;
