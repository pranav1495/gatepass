import React, { useState, useEffect } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [responses, setResponses] = useState({
    name: '',
    email: '',
    suggestion: '',
    comment: '',
    satisfaction: ''
  });
  const [comments, setComments] = useState([]);
  const [sortedComments, setSortedComments] = useState([]);
  const [menuVisible, setMenuVisible] = useState({});
  const [sortOption, setSortOption] = useState('new'); // Default sorting option
  const [negativeComments, setNegativeComments] = useState([]);

  useEffect(() => {
    const storedComments = localStorage.getItem('previousComments');
    if (storedComments) {
      const parsedComments = JSON.parse(storedComments);
      setComments(parsedComments);
      setSortedComments(parsedComments);
    }
  }, []);

  useEffect(() => {
    // Sort comments based on the selected sort option
    if (sortOption === 'new') {
      setSortedComments([...comments].sort((a, b) => b.timestamp - a.timestamp)); // Sort by newest first
    } else if (sortOption === 'old') {
      setSortedComments([...comments].sort((a, b) => a.timestamp - b.timestamp)); // Sort by oldest first
    } else if (sortOption === 'top') {
      setSortedComments([...comments].sort((a, b) => b.averageRating - a.averageRating)); // Sort by highest average rating first
    }
  }, [comments, sortOption]);

  useEffect(() => {
    // Detect negative comments based on average rating <= 2
    const detectedNegativeComments = comments.filter(comment => comment.averageRating <= 2);
    setNegativeComments(detectedNegativeComments);
  }, [comments]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResponses(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      ...responses,
      id: Date.now(),
      timestamp: Date.now(),
      ratings: [],
      averageRating: 0,
      loveCount: 0 
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem('previousComments', JSON.stringify(updatedComments));

    setResponses({
      name: '',
      email: '',
      suggestion: '',
      comment: '',
      satisfaction: ''
    });
    console.log('Feedback submitted:', newComment);
  };

  const handleLove = (id) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        if (!comment.lovedBy || !comment.lovedBy.includes(responses.email)) {
          const updatedLovedBy = comment.lovedBy ? [...comment.lovedBy, responses.email] : [responses.email];
          return { ...comment, loveCount: comment.loveCount + 1, lovedBy: updatedLovedBy };
        } else {
          const updatedLovedBy = comment.lovedBy.filter(email => email !== responses.email);
          return { ...comment, loveCount: comment.loveCount - 1, lovedBy: updatedLovedBy };
        }
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem('previousComments', JSON.stringify(updatedComments));
  };

  const handleEdit = (id, editedComment) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { 
          ...comment, 
          suggestion: editedComment, 
          editedAt: new Date().toLocaleString() 
        };
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem('previousComments', JSON.stringify(updatedComments));
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem('previousComments', JSON.stringify(updatedComments));
  };

  const handleRating = (id, rating) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        const newRatings = [...comment.ratings, rating];
        const averageRating = newRatings.reduce((acc, curr) => acc + curr, 0) / newRatings.length;
        return { ...comment, ratings: newRatings, averageRating };
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem('previousComments', JSON.stringify(updatedComments));
  };

  const toggleMenu = (id) => {
    setMenuVisible(prevMenu => ({
      ...prevMenu,
      [id]: !prevMenu[id]
    }));
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="feedback-form">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input type="text" name="name" value={responses.name} placeholder='JohnDoe' onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" name="email" value={responses.email} placeholder='johndoe@gmail.com' onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Submit your response here:
            <textarea name="suggestion" value={responses.suggestion} placeholder="Enter any comment here!!!" onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>

      <div className="sort-options">
        <label>
          Sort by:
          <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="top">Top Rated</option>
          </select>
        </label>
      </div>

      {sortedComments.length > 0 && (
        <div className="previous-comments">
          <h3>Previous Comments</h3>
          <ul>
            {sortedComments.map(comment => (
              <li key={comment.id}>
                <div className="comment">
                  <div className="user-info">
                    <p className="user-name">{comment.name}</p>
                    <p className="user-email">
                      <a href={`mailto:${comment.email}`} onClick={(e) => { e.preventDefault(); handleEmailClick(comment.email); }}>
                        {comment.email}
                      </a>
                    </p>
                  </div>
                  <div className="menu-container">
                    <button className="menu-button" onClick={() => toggleMenu(comment.id)}>⋮</button>
                    {menuVisible[comment.id] && (
                      <div className="dropdown-menu">
                        <button className="edit-button" onClick={() => {
                          const editedComment = prompt('Edit your comment:', comment.suggestion);
                          if (editedComment !== null && editedComment !== '') {
                            handleEdit(comment.id, editedComment);
                          }
                        }}>
                          Edit
                        </button>
                        <button className="delete-button" onClick={() => {
                          if (window.confirm('Are you sure you want to delete this comment?')) {
                            handleDelete(comment.id);
                          }
                        }}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="comment-text">"{comment.suggestion}"</p>
                  <p className="timestamp-text">Submitted at: {formatTimestamp(comment.timestamp)}</p>
                  {comment.editedAt && (
                    <p className="edited-at-text">Edited at: {formatTimestamp(comment.editedAt)}</p>
                  )}
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <span
                        key={rating}
                        className={`star ${rating <= comment.averageRating ? 'filled' : ''}`}
                        onClick={() => handleRating(comment.id, rating)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="average-rating-text">Average Rating: {comment.averageRating?.toFixed(1) ?? 0} / 5</p>
                  <div className="like-buttons">
                    <button className="love-button" onClick={() => handleLove(comment.id)}>
                      ❤️ Love ({comment.loveCount})
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {negativeComments.length > 0 && (
        <div className="negative-comments">
          <h3>Negative Feedback</h3>
          <ul>
            {negativeComments.map(comment => (
              <li key={comment.id}>
                <div className="comment">
                  <div className="user-info">
                    <p className="user-name">{comment.name}</p>
                    <p className="user-email">
                      <a href={`mailto:${comment.email}`} onClick={(e) => { e.preventDefault(); handleEmailClick(comment.email); }}>
                        {comment.email}
                      </a>
                    </p>
                  </div>
                  <p className="comment-text">"{comment.suggestion}"</p>
                  {comment.editedAt && (
                    <p className="edited-at-text">Edited at: {formatTimestamp(comment.editedAt)}</p>
                  )}
                  <p className="timestamp-text">Submitted at: {formatTimestamp(comment.timestamp)}</p>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <span
                        key={rating}
                        className={`star ${rating <= comment.averageRating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="average-rating-text">Average Rating: {comment.averageRating?.toFixed(1) ?? 0} / 5</p>
                  <div className="like-buttons">
                    <button className="love-button" onClick={() => handleLove(comment.id)}>
                      ❤️ Love ({comment.loveCount})
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="scroll-button" onClick={scrollToTop}>&uarr; Scroll to Top</button>
      <button className="scroll-button" onClick={scrollToBottom}>&darr; Scroll to Bottom</button>
    </div>
  );
};

export default Feedback;
