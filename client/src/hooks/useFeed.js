import { useState, useEffect, useCallback } from 'react';
import { posts } from '../services/api';
import toast from 'react-hot-toast';

export const useFeed = (initialFilter = 'foryou') => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(initialFilter);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNum, currentFilter, append = false) => {
    try {
      setLoading(!append);
      const res = await posts.getFeed({ page: pageNum, filter: currentFilter, limit: 10 });
      const newPosts = res.data?.posts || res.data || [];
      if (newPosts.length < 10) setHasMore(false);
      setFeedPosts(prev => append ? [...prev, ...newPosts] : newPosts);
    } catch (error) {
      toast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchPosts(1, filter, false);
  }, [filter, fetchPosts]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage, filter, true);
    }
  };

  const changeFilter = (f) => setFilter(f);
  const refresh = () => fetchPosts(1, filter, false);

  return { posts: feedPosts, loading, hasMore, loadMore, filter, changeFilter, refresh };
};
