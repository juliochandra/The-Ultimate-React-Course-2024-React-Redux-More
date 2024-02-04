import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => {
      return [...items, item];
    });
  }

  function handleDeleteItem(id) {
    setItems((items) => {
      return items.filter((item) => {
        return item.id !== id;
      });
    });
  }

  function handleToogleItem(id) {
    setItems((items) => {
      return items.map((item) => {
        return item.id === id ? { ...item, packed: !item.packed } : item;
      });
    });
  }

  function handleClearlist() {
    const confirmed = window.confirm(
      "are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToogleItem}
        onClearList={handleClearlist}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
