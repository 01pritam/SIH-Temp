import React, { useState } from 'react';
import axios from 'axios';
import './projects.css';

const Projects = () => {
  const initialProjectData = {
    title: '',
    description: '',
    imageUrls: [],
    tags: '', // Initialize tags as an empty string
    link: '',
    projectType: '', // Initialize projectType as an empty string
  };

  const [projectsData, setProjectsData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProject, setNewProject] = useState(initialProjectData);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio' && name === 'projectType') {
      setNewProject({
        ...newProject,
        [name]: value,
      });
    } else {
      // Check if the input is for "tags"
      if (name === 'tags') {
        // Replace spaces with spaces followed by "#" to create hashtags
        const tagsValue = value.replace(/ /g, ' #');

        // Remove "#" if it appears at the beginning
        if (tagsValue.startsWith('# ')) {
          setNewProject({
            ...newProject,
            [name]: tagsValue.substring(2), // Remove the first two characters (the extra "# ")
          });
        } else {
          setNewProject({
            ...newProject,
            [name]: tagsValue,
          });
        }
      } else {
        setNewProject({
          ...newProject,
          [name]: value,
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);

    setNewProject({
      ...newProject,
      imageUrls: [], // Reset imageUrls to an empty array
      imageFiles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = newProject.imageFiles.map((file) => URL.createObjectURL(file));

    const projectWithImages = {
      ...newProject,
      imageUrls,
    };

    try {
      // Send the data to the server using Axios
      const response = await axios.post('/api/projects', projectWithImages); // Replace with your server endpoint
      console.log('Server response:', response.data);

      // Update projectsData and reset the form
      setProjectsData([...projectsData, projectWithImages]);
      setNewProject(initialProjectData);
      toggleForm();
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  return (
    <div className="projects-container">
      <h2>Explore User-Submitted Projects</h2>
      <button onClick={toggleForm} className="add-project-button">
        Add Project
      </button>

      {isFormVisible && (
        <div className="project-form">
          <h3>Add Your Project</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newProject.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProject.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="imageFiles"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags"
              value={newProject.tags}
              onChange={handleInputChange}
              required
            />
            <div className="project-type">
              <label>Project Type:</label>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="School"
                  onChange={handleInputChange}
                  checked={newProject.projectType === 'School'}
                />
                School
              </label>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="College"
                  onChange={handleInputChange}
                  checked={newProject.projectType === 'College'}
                />
                College
              </label>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  value="Others"
                  onChange={handleInputChange}
                  checked={newProject.projectType === 'Others'}
                />
                Others
              </label>
            </div>
            <input
              type="url"
              name="link"
              placeholder="Project Link"
              value={newProject.link}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <div className="project-list">
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            {project.imageUrls.map((imageUrl, imgIndex) => (
              <img src={imageUrl} alt={`${project.title}-image-${imgIndex}`} key={imgIndex} />
            ))}
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.tags}</p>
              <p>{project.projectType}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
