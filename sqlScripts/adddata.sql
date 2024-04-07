-- Insert test data into the users table
INSERT INTO `users` (`username`, `password`, `name`, `email`, `phone`, `zip`, `locationname`, `usertype`, `joindate`)
VALUES

    ('seller', '$2a$10$DwegiHX1775HpYMk81ge.Ox6KWFbylqT2cV83tHUxLK79wS87eMn.', 'Seller Name', 'TESTEMAIL@GMAIL,com', 8679309, 12342, 'Fast Johnnys Pizza', 'seller', '2022-09-30');


INSERT INTO `users` (`username`, `password`, `name`, `email`, `phone`, `zip`, `usertype`, `joindate`)
VALUES

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
INSERT INTO `items` (`name`, `description`, `category`, `msrp`, `price`, `expiration`, `location`, `zip`, `itemstatus`, `img`, `listeddate`)
VALUES 
('Pasta Carbonara', 'Classic Italian pasta with bacon and eggs', 'Pork', 12.99,12.99,  '2024-04-15', 'Italian Bistro', '12345', 'Available', '2', '2024-03-12'),
('Vegetarian Salad', 'Fresh and healthy salad with mixed greens', 'Veggies', 12.99,8.99, '2024-04-20', 'Vegetarian Delight','54321', 'Available', '3', '2024-03-13'),
('Sushi Platter', 'Assorted sushi rolls with wasabi and soy sauce', 'Fish', 12.99,24.99, '2024-04-25', 'Sushi Paradise','12345', 'Available', '4', '2024-03-14'),
('Chocolate Cake', 'Rich and decadent chocolate cake with frosting', 'Dairy', 12.99,16.99, '2024-04-10', 'Sweet Delights Bakery','12345', 'Available', '5', '2024-03-15'),
('Steak Fajitas', 'Sizzling beef fajitas with bell peppers and onions', 'Beef', 12.99,21.99, '2024-04-22', 'Tex-Mex Grill','54321', 'Available', '6', '2024-03-23'),
('Greek Salad', 'Traditional Greek salad with olives and feta cheese', 'Veggies', 11.99,12.99, '2024-04-25', 'Olympian Eats','54321', 'Available', '7', '2024-03-24'),
('Dragon Roll', 'Specialty sushi roll with eel and avocado', 'Fish', 26.99,12.99,  '2024-04-20', 'Dragon Sushi Bar','12345', 'Available', '8', '2024-03-25'),
('Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers', 'Dairy', 12.99,19.99,  '2024-04-15', 'Dolce Vita Patisserie', '54321','Available', '9', '2024-03-26'),
('Chicken Alfredo Pizza', 'Creamy Alfredo sauce with chicken on a pizza crust', 'Poultry', 12.99,17.99,  '2024-04-18', 'Alfredos Pizza Palace','12345', 'Available', '10', '2024-03-27'),
('Vegetarian Biryani', 'Spiced rice with mixed vegetables and aromatic spices', 'Veggies', 12.99,14.99,  '2024-04-28', 'Biryani Bliss','54321', 'Available', '11', '2024-03-28'),
('Iced Matcha Latte', 'Cold matcha green tea latte with milk and ice', 'Veggies', 6.99,12.99,  '2024-04-30', 'Matcha Haven','12345', 'Available', '12', '2024-03-29'),
('Caprese Panini', 'Grilled panini with mozzarella, tomatoes, and basil', 'Veggies', 9.99,12.99,  '2024-05-05', 'Panini Paradise','54321', 'Available', '13', '2024-03-30'),
('Seafood Paella', 'Spanish rice dish with a variety of seafood', 'Fish', 23.99,12.99, '2024-05-10', 'Paella Passion', '12345','Available', '14', '2024-04-01'),
('Mango Tango Smoothie', 'Sweet and tropical smoothie with fresh mango', 'Dairy', 8.99,12.99, '2024-05-15', 'Smoothie Delight','12345', 'Available', '15', '2024-04-02'),
('Spaghetti Bolognese', 'Classic Italian pasta with meat sauce', 'Beef', 14.99,12.99, '2024-04-18', 'Mama Mia Trattoria','54321', 'Available', '16', '2024-03-16'),
('Caesar Salad', 'Romaine lettuce with croutons and Caesar dressing', 'Veggies', 10.99,12.99, '2024-04-22', 'Fresh Greens Cafe','12345', 'Available', '17', '2024-03-17'),
('Sashimi Platter', 'Fresh slices of raw fish with wasabi and soy sauce', 'Fish', 29.99,12.99, '2024-04-28', 'Tokyo Sushi House','54321', 'Available', '18', '2024-03-18'),
('Cheesecake', 'Creamy and delightful cheesecake with fruit topping', 'Dairy', 18.99,12.99, '2024-04-12', 'Sweet Indulgence Bakery','12345', 'Available', '19', '2024-03-19'),
('Margarita Pizza', 'Classic pizza with tomato sauce and mozzarella', 'Veggies', 16.99,12.99, '2024-04-14', 'Pizza Haven','12345', 'Available', '20', '2024-03-20'),
('Vegetable Curry', 'Spicy and flavorful curry with mixed vegetables', 'Veggies', 13.99,12.99, '2024-04-26', 'Spice Kingdom', '12345','Available', '21', '2024-03-21'),
('Fruit Smoothie', 'Refreshing smoothie with a mix of fresh fruits', 'Dairy', 7.99,12.99, '2024-04-30', 'Smoothie Oasis', '12345','Available', '22', '2024-03-22');










-- Insert test data into the listing table
INSERT INTO listing (itemID, sellerID, createDate)
VALUES
    (1, 1, '2022-01-10'),
    (2, 2, '2022-02-25'),
    (3, 3, '2022-02-25'),
    (4, 2, '2022-02-25'),
    (5, 4, '2022-02-25'),
    (6, 3, '2022-02-25'),
    (7, 1, '2022-02-25'),
    (8, 1, '2022-02-25'),
    (9, 2, '2022-02-25'),
    (10, 3, '2022-02-25'),
    (11, 1, '2022-02-25'),
    (12, 2, '2022-02-25'),
    (13, 3, '2022-02-25'),
    (14, 1, '2022-02-25'),
    (15, 1, '2022-02-25'),
    (16, 1, '2022-02-25'), 
    (17, 1, '2022-02-25'),    
    (18, 1, '2022-02-25'),
    (19, 1, '2022-02-25'),
    (20, 1, '2022-02-25'),
    (21, 1, '2022-02-25');
    



-- -- Insert test data into the reserved table
-- INSERT INTO reserved (buyerID, itemID, reservationDate, itemstatus)
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



INSERT INTO `locations` (`sellerID`, `name`, `address`, `city`, `state`, `zip`, `phone_number`, `email`, `website`)
VALUES 

    (1, 'Fresh Produce Market', '456 Elm St', 'Smallville', 'Anystate', '54321', '555-987-6543', 'freshproduce@example.com', 'http://www.freshproducemarket.com'),
    (2, 'Healthy Bites Cafe', '789 Oak St', 'Metropolis', 'Anystate', '67890', '555-555-5555', 'healthybites@example.com', 'http://www.healthybitescafe.com'),
    (3, 'Tasty Tacos', '321 Maple St', 'Big City', 'Anystate', '13579', '555-222-3333', 'tastytacos@example.com', 'http://www.tastytacos.com'),
    (4, 'Pizza Paradise', '654 Pine St', 'Village', 'Anystate', '97531', '555-888-9999', 'pizzaparadise@example.com', 'http://www.pizzaparadise.com'),
    (5, 'Bakery Delights', '987 Cedar St', 'Hometown', 'Anystate', '24680', '555-444-3333', 'bakerydelights@example.com', 'http://www.bakerydelights.com'),
    (6, 'Sushi Haven', '741 Birch St', 'Townsville', 'Anystate', '36912', '555-111-2222', 'sushihaven@example.com', 'http://www.sushihaven.com'),
    (7, 'Burger Joint', '852 Walnut St', 'Metroville', 'Anystate', '75319', '555-666-7777', 'burgerjoint@example.com', 'http://www.burgerjoint.com'),
    (8, 'Ice Cream Parlor', '369 Oak St', 'Riverside', 'Anystate', '86420', '555-999-0000', 'icecreamparlor@example.com', 'http://www.icecreamparlor.com'),
    (9, 'Vegetarian Delights', '147 Cherry St', 'Hilltop', 'Anystate', '25874', '555-123-9876', 'vegetariandelights@example.com', 'http://www.vegetariandelights.com');
