import React, { useState, useEffect } from 'react';
import './App.css';

interface Customer {
  id: number;
  name: string;
  age: number;
  location: string;
  picture: string;
}

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const generateRandomCustomers = (count: number): Customer[] => {
    const customers: Customer[] = [];
    for (let i = 1; i <= count; i++) {
      const customer: Customer = {
        id: i,
        name: `Customer ${i}`,
        age: Math.floor(Math.random() * 50) + 20,
        location: 'Unknown',
        picture: '', // Initialize picture URL as empty
      };
      customers.push(customer);
    }
    return customers;
  };

  const [customersData, setCustomersData] = useState<Customer[]>(generateRandomCustomers(50));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        const data = await response.json();
        const pictureUrls = data.results.map((result: any) => result.picture.large);
        setImageUrls(pictureUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();

    const intervalId = setInterval(fetchImages, 10000); // Fetch images every 10 seconds

    return () => clearInterval(intervalId);
  }, []); // Run only once on component mount

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <h2>Customers</h2>
        <p><strong>Customers Data:</strong> This is a list of customers available in the system.</p>
        <div className="customer-list">
          {customersData.map((customer) => (
            <div
              key={customer.id}
              className={`customer-item ${selectedCustomer?.id === customer.id ? 'selected' : ''}`}
              onClick={() => handleCustomerClick(customer)}
            >
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Age:</strong> {customer.age}</p>
              <p><strong>Location:</strong> {customer.location}</p>
              <p><strong>Additional Info:</strong> Some additional information about the customer...</p>
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <center><h2>Customer Details</h2></center>
        {selectedCustomer && (
          <div>
            <center><div><p>Customers information, or customer data, is a collection of details and data points about a company's customers. This information can be used for various purposes, including marketing sales, product development, customer care, and business analytics.</p></div></center>
            {/* <p><strong>ID:</strong> {selectedCustomer.id}</p> */}
            {/* <p><strong>Name:</strong> {selectedCustomer.name}</p> */}
            <div className="photo-grid">
              {imageUrls.slice((selectedCustomer.id - 1) * 9, selectedCustomer.id * 9).map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Photo ${index}`}
                  style={{ width: '250px', height: '150px' }} // Set width and height directly
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
