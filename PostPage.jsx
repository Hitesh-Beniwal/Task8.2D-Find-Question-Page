import React, { useState } from "react";
import { Button, Input, TextArea, Segment, Radio, Form } from "semantic-ui-react";
import { db, storage } from './firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './PostPage.css';

function PostPage() {
  const [postType, setPostType] = useState('question'); // question or article
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null); // Store the image file
  const [imageUrl, setImageUrl] = useState(''); // Store the image URL
  const [articleText, setArticleText] = useState('');
  const [abstract, setAbstract] = useState('');

  // Handle file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async () => {
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      try {
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef); // Get the download URL
        setImageUrl(url); // Set the image URL in state
        console.log("Image uploaded successfully:", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (postType === 'question') {
      // Add question to Firestore
      try {
        await addDoc(collection(db, "posts"), {
          title,
          description,
          tags,
          postType: 'question', // Adding postType field
          date: new Date().toISOString(),
        });
        alert('Question posted!');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else if (postType === 'article') {
      // First, upload image if there's one
      await uploadImage();

      // Add article to Firestore
      try {
        await addDoc(collection(db, "posts"), {
          title,
          abstract,
          articleText,
          tags,
          imageUrl, // Include the image URL
          postType: 'article', // Adding postType field
          date: new Date().toISOString(),
        });
        alert('Article posted!');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="post-container">
      {/* Radio buttons for selecting Post Type */}
      <Form>
        <Form.Field>
          <label>Post Type</label>
          <Radio
            label="Question"
            name="postType"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
          />
          <Radio
            label="Article"
            name="postType"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
            style={{ marginLeft: "20px" }}
          />
        </Form.Field>
      </Form>

      {/* Fields for both Question and Article */}
      <div style={{ marginBottom: "20px" }}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input-field"
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="input-field"
          style={{ display: postType === 'question' ? 'block' : 'none' }} // Only show for questions
        />
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags"
          className="input-field"
        />
        
      </div>

      {/* Show article-specific fields */}
      {postType === 'article' && (
        <>
          <TextArea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            placeholder="Abstract"
            className="input-field"
          />
          <TextArea
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            placeholder="Article Text"
            className="input-field"
          />
          <Segment className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "10px" }}
            />
            {image && <p className="image-name">Image selected: {image.name}</p>}
          </Segment>
        </>
      )}

      <Button onClick={handleSubmit} primary className="post-button">
        Post
      </Button>
    </div>
  );
}

export default PostPage;
