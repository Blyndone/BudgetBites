-- Insert test data into the users table

INSERT INTO `users` (`username`, `password`, `name`, `email`, `phone`, `zip`, `usertype`, `joindate`)
VALUES
    ('Foodie123', 'foodpass', 'Foodie', 'foodie@example.com', 1234567890, 12345, 'buyer', '2022-01-01'),
    ('ChefMaster', 'masterchef', 'Chef Master', 'chef@example.com', 1234567891, 12346, 'seller', '2022-02-15'),
    ('FitnessFanatic', 'fitpass', 'Fitness Fanatic', 'fitnessfan@example.com', 1234567892, 12347, 'buyer', '2022-04-05'),
    ('TechGeek', 'techpass', 'Tech Geek', 'techgeek@example.com', 1234567893, 12348, 'buyer', '2022-05-20'),
    ('GardeningGuru', 'greenpass', 'Gardening Guru', 'gardener@example.com', 1234567894, 12349, 'seller', '2022-06-12'),
    ('TravelExplorer', 'travelpass', 'Travel Explorer', 'traveler@example.com', 1234567895, 12340, 'buyer', '2022-07-18'),
    ('Bookworm', 'bookpass', 'Bookworm', 'reader@example.com', 1234567896, 12341, 'buyer', '2022-08-25'),
    ('Fashionista', 'stylepass', 'Fashionista', 'fashionista@example.com', 1234567897, 12342, 'seller', '2022-09-30'),
    ('PetLover', 'petpass', 'Pet Lover', 'petlover@example.com', 1234567898, 12343, 'buyer', '2022-10-15');

-- Insert test data into the items table (food items)
INSERT INTO `items` (`name`, `description`, `category`, `price`, `count`, `expiration`, `location`, `status`, `img`, `listeddate`)
VALUES 
('Pasta Carbonara', 'Classic Italian pasta with bacon and eggs', 'Main Course', 12.99, 15, '2024-04-15', 'Italian Bistro', 'Available', 'carbonara_image.jpg', '2024-03-12'),
('Vegetarian Salad', 'Fresh and healthy salad with mixed greens', 'Salad', 8.99, 20, '2024-04-20', 'Vegetarian Delight', 'Available', 'salad_image.jpg', '2024-03-13'),
('Sushi Platter', 'Assorted sushi rolls with wasabi and soy sauce', 'Sushi', 24.99, 12, '2024-04-25', 'Sushi Paradise', 'Available', 'sushi_image.jpg', '2024-03-14'),
('Chocolate Cake', 'Rich and decadent chocolate cake with frosting', 'Dessert', 16.99, 8, '2024-04-10', 'Sweet Delights Bakery', 'Available', 'cake_image.jpg', '2024-03-15'),
('Steak Fajitas', 'Sizzling beef fajitas with bell peppers and onions', 'Main Course', 21.99, 15, '2024-04-22', 'Tex-Mex Grill', 'Available', 'fajitas_image.jpg', '2024-03-23'),
('Greek Salad', 'Traditional Greek salad with olives and feta cheese', 'Salad', 11.99, 20, '2024-04-25', 'Olympian Eats', 'Available', 'greek_salad_image.jpg', '2024-03-24'),
('Dragon Roll', 'Specialty sushi roll with eel and avocado', 'Sushi', 26.99, 10, '2024-04-20', 'Dragon Sushi Bar', 'Available', 'dragon_roll_image.jpg', '2024-03-25'),
('Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers', 'Dessert', 19.99, 8, '2024-04-15', 'Dolce Vita Patisserie', 'Available', 'tiramisu_image.jpg', '2024-03-26'),
('Chicken Alfredo Pizza', 'Creamy Alfredo sauce with chicken on a pizza crust', 'Pizza', 17.99, 15, '2024-04-18', 'Alfredos Pizza Palace', 'Available', 'chicken_alfredo_pizza_image.jpg', '2024-03-27'),
('Vegetarian Biryani', 'Spiced rice with mixed vegetables and aromatic spices', 'Curry', 14.99, 20, '2024-04-28', 'Biryani Bliss', 'Available', 'biryani_image.jpg', '2024-03-28'),
('Iced Matcha Latte', 'Cold matcha green tea latte with milk and ice', 'Beverage', 6.99, 30, '2024-04-30', 'Matcha Haven', 'Available', 'matcha_latte_image.jpg', '2024-03-29'),
('Caprese Panini', 'Grilled panini with mozzarella, tomatoes, and basil', 'Sandwich', 9.99, 25, '2024-05-05', 'Panini Paradise', 'Available', 'caprese_panini_image.jpg', '2024-03-30'),
('Seafood Paella', 'Spanish rice dish with a variety of seafood', 'Main Course', 23.99, 12, '2024-05-10', 'Paella Passion', 'Available', 'seafood_paella_image.jpg', '2024-04-01'),
('Mango Tango Smoothie', 'Sweet and tropical smoothie with fresh mango', 'Beverage', 8.99, 30, '2024-05-15', 'Smoothie Delight', 'Available', 'mango_smoothie_image.jpg', '2024-04-02'),
('Spaghetti Bolognese', 'Classic Italian pasta with meat sauce', 'Main Course', 14.99, 18, '2024-04-18', 'Mama Mia Trattoria', 'Available', 'bolognese_image.jpg', '2024-03-16'),
('Caesar Salad', 'Romaine lettuce with croutons and Caesar dressing', 'Salad', 10.99, 25, '2024-04-22', 'Fresh Greens Cafe', 'Available', 'caesar_salad_image.jpg', '2024-03-17'),
('Sashimi Platter', 'Fresh slices of raw fish with wasabi and soy sauce', 'Sushi', 29.99, 10, '2024-04-28', 'Tokyo Sushi House', 'Available', 'sashimi_image.jpg', '2024-03-18'),
('Cheesecake', 'Creamy and delightful cheesecake with fruit topping', 'Dessert', 18.99, 12, '2024-04-12', 'Sweet Indulgence Bakery', 'Available', 'cheesecake_image.jpg', '2024-03-19'),
('Margarita Pizza', 'Classic pizza with tomato sauce and mozzarella', 'Pizza', 16.99, 15, '2024-04-14', 'Pizza Haven', 'Available', 'margarita_pizza_image.jpg', '2024-03-20'),
('Vegetable Curry', 'Spicy and flavorful curry with mixed vegetables', 'Curry', 13.99, 20, '2024-04-26', 'Spice Kingdom', 'Available', 'curry_image.jpg', '2024-03-21'),
('Fruit Smoothie', 'Refreshing smoothie with a mix of fresh fruits', 'Beverage', 7.99, 30, '2024-04-30', 'Smoothie Oasis', 'Available', 'smoothie_image.jpg', '2024-03-22');










-- Insert test data into the listing table
INSERT INTO listing (listingID, itemID, sellerID, createDate)
VALUES
    (1, 1, 2, '2022-01-10'),
    (2, 2, 1, '2022-02-25'),
    (3, 3, 2, '2022-03-20');

-- Insert test data into the reserved table
INSERT INTO reserved (reservationID, buyerID, itemID, reservationDate, status)
VALUES
    (1, 1, 2, '2022-02-28', 'reserved'),
    (2, 2, 1, '2022-03-05', 'reserved'),
    (3, 1, 3, '2022-03-25', 'reserved');