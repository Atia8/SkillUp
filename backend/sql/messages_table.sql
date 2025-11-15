CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,           -- Who sent the message
  receiver_id INT NOT NULL,         -- Who received the message  
  content TEXT NOT NULL,            -- The message text
  is_read BOOLEAN DEFAULT FALSE,    -- Whether message was read
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id),
  
  -- Indexes for performance
  INDEX idx_sender_receiver (sender_id, receiver_id),
  INDEX idx_receiver_sender (receiver_id, sender_id),
  INDEX idx_created_at (created_at)
);