import { useState, useEffect } from 'preact/hooks';
import styles from '../components/Search.module.css';

export function Search({ handleSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        id='search'
        icon='search'
        placeholder='Search'
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}
