import React from 'react';
import { Header } from '../components/layout/Header';
import { PostCard } from '../components/cards/PostCard';
import { ChatInput } from '../components/chat/ChatInput';
import './PostDetail.css';

export const PostDetail = () => {
  // Mock Post
  const post = { _id: '1', user: { name: 'User1', username: 'user1' }, caption: 'Test Post', media: [] };

  return (
    <div className="post-detail-page">
      <Header title="Post" showBack />
      <div className="post-detail-content">
        <PostCard post={post} />
        <div className="comments-section">
          <h4 className="comments-title">Comments</h4>
          {/* Mock comments */}
          <div className="comment-mock">No comments yet</div>
        </div>
      </div>
      <ChatInput onSend={(text) => console.log(text)} />
    </div>
  );
};
