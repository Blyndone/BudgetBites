-- Insert test data into the users table

INSERT INTO `users` (`username`, `password`, `name`, `email`, `phone`, `zip`, `usertype`, `joindate`)
VALUES

    ('seller', '$2a$10$DwegiHX1775HpYMk81ge.Ox6KWFbylqT2cV83tHUxLK79wS87eMn.', 'Seller Name', 'TESTEMAIL@GMAIL,com', 8679309, 12342, 'seller', '2022-09-30'),
    ('customer', '$2a$10$/dRwPs/RMUjIXeTLxwV4H.bq1EJK4lJ77xUAHg3i6j.NimnBpD7QO', 'Customer Name', 'TESTEMAIL@GMAIL,com', 8679309, 12342, 'buyer', '2022-09-30'),
    ('Fashionista', 'stylepass', 'Fashionista', 'fashionista@example.com', 1234567897, 12342, 'seller', '2022-09-30'),
    ('Foodie123', 'foodpass', 'Foodie', 'foodie@example.com', 1234567890, 12345, 'buyer', '2022-01-01'),
    ('ChefMaster', 'masterchef', 'Chef Master', 'chef@example.com', 1234567891, 12346, 'seller', '2022-02-15'),
    ('FitnessFanatic', 'fitpass', 'Fitness Fanatic', 'fitnessfan@example.com', 1234567892, 12347, 'buyer', '2022-04-05'),
    ('TechGeek', 'techpass', 'Tech Geek', 'techgeek@example.com', 1234567893, 12348, 'buyer', '2022-05-20'),
    ('GardeningGuru', 'greenpass', 'Gardening Guru', 'gardener@example.com', 1234567894, 12349, 'seller', '2022-06-12'),
    ('TravelExplorer', 'travelpass', 'Travel Explorer', 'traveler@example.com', 1234567895, 12340, 'buyer', '2022-07-18'),
    ('Bookworm', 'bookpass', 'Bookworm', 'reader@example.com', 1234567896, 12341, 'buyer', '2022-08-25'),
   
    ('PetLover', 'petpass', 'Pet Lover', 'petlover@example.com', 1234567898, 12343, 'buyer', '2022-10-15');


-- Insert test data into the items table (food items)
INSERT INTO `items` (`name`, `description`, `category`, `price`, `count`, `expiration`, `location`, `status`, `img`, `listeddate`)
VALUES 
('Pasta Carbonara', 'Classic Italian pasta with bacon and eggs', 'Main Course', 12.99, 15, '2024-04-15', 'Italian Bistro', 'Available', '2', '2024-03-12'),
('Vegetarian Salad', 'Fresh and healthy salad with mixed greens', 'Salad', 8.99, 20, '2024-04-20', 'Vegetarian Delight', 'Available', '3', '2024-03-13'),
('Sushi Platter', 'Assorted sushi rolls with wasabi and soy sauce', 'Sushi', 24.99, 12, '2024-04-25', 'Sushi Paradise', 'Available', '4', '2024-03-14'),
('Chocolate Cake', 'Rich and decadent chocolate cake with frosting', 'Dessert', 16.99, 8, '2024-04-10', 'Sweet Delights Bakery', 'Available', '5', '2024-03-15'),
('Steak Fajitas', 'Sizzling beef fajitas with bell peppers and onions', 'Main Course', 21.99, 15, '2024-04-22', 'Tex-Mex Grill', 'Available', '6', '2024-03-23'),
('Greek Salad', 'Traditional Greek salad with olives and feta cheese', 'Salad', 11.99, 20, '2024-04-25', 'Olympian Eats', 'Available', '7', '2024-03-24'),
('Dragon Roll', 'Specialty sushi roll with eel and avocado', 'Sushi', 26.99, 10, '2024-04-20', 'Dragon Sushi Bar', 'Available', '8', '2024-03-25'),
('Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers', 'Dessert', 19.99, 8, '2024-04-15', 'Dolce Vita Patisserie', 'Available', '9', '2024-03-26'),
('Chicken Alfredo Pizza', 'Creamy Alfredo sauce with chicken on a pizza crust', 'Pizza', 17.99, 15, '2024-04-18', 'Alfredos Pizza Palace', 'Available', '10', '2024-03-27'),
('Vegetarian Biryani', 'Spiced rice with mixed vegetables and aromatic spices', 'Curry', 14.99, 20, '2024-04-28', 'Biryani Bliss', 'Available', '11', '2024-03-28'),
('Iced Matcha Latte', 'Cold matcha green tea latte with milk and ice', 'Beverage', 6.99, 30, '2024-04-30', 'Matcha Haven', 'Available', '12', '2024-03-29'),
('Caprese Panini', 'Grilled panini with mozzarella, tomatoes, and basil', 'Sandwich', 9.99, 25, '2024-05-05', 'Panini Paradise', 'Available', '13', '2024-03-30'),
('Seafood Paella', 'Spanish rice dish with a variety of seafood', 'Main Course', 23.99, 12, '2024-05-10', 'Paella Passion', 'Available', '14', '2024-04-01'),
('Mango Tango Smoothie', 'Sweet and tropical smoothie with fresh mango', 'Beverage', 8.99, 30, '2024-05-15', 'Smoothie Delight', 'Available', '15', '2024-04-02'),
('Spaghetti Bolognese', 'Classic Italian pasta with meat sauce', 'Main Course', 14.99, 18, '2024-04-18', 'Mama Mia Trattoria', 'Available', '16', '2024-03-16'),
('Caesar Salad', 'Romaine lettuce with croutons and Caesar dressing', 'Salad', 10.99, 25, '2024-04-22', 'Fresh Greens Cafe', 'Available', '17', '2024-03-17'),
('Sashimi Platter', 'Fresh slices of raw fish with wasabi and soy sauce', 'Sushi', 29.99, 10, '2024-04-28', 'Tokyo Sushi House', 'Available', '18', '2024-03-18'),
('Cheesecake', 'Creamy and delightful cheesecake with fruit topping', 'Dessert', 18.99, 12, '2024-04-12', 'Sweet Indulgence Bakery', 'Available', '19', '2024-03-19'),
('Margarita Pizza', 'Classic pizza with tomato sauce and mozzarella', 'Pizza', 16.99, 15, '2024-04-14', 'Pizza Haven', 'Available', '20', '2024-03-20'),
('Vegetable Curry', 'Spicy and flavorful curry with mixed vegetables', 'Curry', 13.99, 20, '2024-04-26', 'Spice Kingdom', 'Available', '21', '2024-03-21'),
('Fruit Smoothie', 'Refreshing smoothie with a mix of fresh fruits', 'Beverage', 7.99, 30, '2024-04-30', 'Smoothie Oasis', 'Available', '22', '2024-03-22');










-- Insert test data into the listing table
INSERT INTO listing (itemID, sellerID, createDate)
VALUES
    (1, 1, '2022-01-10'),
    (2, 1, '2022-02-25'),
    (3, 1, '2022-03-20'),
    (4, 1, '2022-03-20'),
    (5, 1, '2022-03-20'),
    (6, 1, '2022-03-20'),
    (7, 1, '2022-03-20'),
    (8, 1, '2022-03-20');


-- -- Insert test data into the reserved table
-- INSERT INTO reserved (buyerID, itemID, reservationDate, status)
-- VALUES
--     (1, 2, '2022-02-28', 'reserved'),
--     (2, 1, '2022-03-05', 'reserved'),
--     (1, 3, '2022-03-25', 'reserved'),
--     (1, 4, '2022-03-25', 'reserved'),
--     (1, 5, '2022-03-25', 'reserved'),
--     (1, 6, '2022-03-25', 'reserved'),
--     (1, 7, '2022-03-25', 'reserved'),
--     (1, 8, '2022-03-25', 'reserved'),
--     (1, 9, '2022-03-25', 'reserved');