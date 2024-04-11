-- pass hash for bbites   '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2'

-- Insert test data into the users table
-- INSERT INTO `users` (`username`, `password`, `name`, `email`, `phone`, `zip`, `locationname`, `usertype`, `joindate`)
-- VALUES

    -- ('seller', '$2a$10$DwegiHX1775HpYMk81ge.Ox6KWFbylqT2cV83tHUxLK79wS87eMn.', 'Seller Name', 'TESTEMAIL@GMAIL,com', 8679309, 12342, 'Fast Johnnys Pizza', 'seller', '2022-09-30');


INSERT INTO `users` (`username`, `password`, `name`, `email`, `phone`, `zip`, `usertype`, `joindate`)
VALUES

    -- ('customer', '$2a$10$/dRwPs/RMUjIXeTLxwV4H.bq1EJK4lJ77xUAHg3i6j.NimnBpD7QO', 'Customer Name', 'TESTEMAIL@GMAIL,com', 8679309, 12342, 'seller', '2022-09-30'),
    
    ('AdotHam', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Alexander Hamilton', 'AdotHam@gmail.com', 0017761804, 30000, 'seller', '2022-09-30'),
    ('AdotBurr', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Aaron Burr', 'AdotBurr@gmail.com', 0017561836, 30000, 'seller', '2022-09-30'),
    ('TheKing', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'King George III', 'YoullBeBack@gmail.com', 0017381820, 40000, 'seller', '2022-09-30'),
    ('FightingFrenchman', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Marquis de Lafayette', 'FFrenchman@gmail.com', 0017761804, 40000, 'seller', '2022-09-30'),
    ('Helpless', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Elizabeth Schuyler', 'Helpless@gmail.com', 0017571854, 30000, 'seller', '2022-09-30'),
    ('Daveed', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Thomas Jefferson', 'AdotHam@gmail.com', 0017431826, 30000, 'seller', '2022-09-30'),

    ('CTurk', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Chris Turkleton', 'CalTurk@gmail.com', 8679309, 30000, 'buyer', '2022-09-30'),
    ('JohnD', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'John JD Dorian', 'DrDorian@gmail.com', 8679309, 40000, 'buyer', '2022-09-30'),
    ('Elliot', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Elliot Ried', 'BangsMcCoy@gmail.com', 8679309, 30000, 'buyer', '2022-09-30'),
    ('Perry', '$2a$10$q0ZYodeFvdX3nnCRnOGxgewQlB5mu5EQ50zqFuSQPQqjMegh71Si2', 'Perry Cox', 'Wolverine@gmail.com', 8679309, 40000, 'buyer', '2022-09-30');




-- Insert test data into the items table (food items)
INSERT INTO `items` (`name`, `description`, `category`, `msrp`, `price`, `expiration`, `location`, `zip`, `itemstatus`, `img`, `listeddate`)
VALUES 
('Honey Glazed Bacon', '15oz of Applewood Bacon Glazed with Honey and Apices', 'Pork', 15.99, 8.99,  '2024-04-14', 'Alexanders Ham Emporium', '30000', 'Available', '63', '2024-04-10'),
('Pork Ribs', '30oz Pork Ribs Adorned with Cloves and Pineapple Rings for Extra Flavor.', 'Pork', 29.99, 10.99,  '2024-04-14', 'Alexanders Ham Emporium', '30000', 'Available', '140', '2024-04-10'),
('The Alexander Special', '8oz Bratwurst Grilled to Perfection.', 'Pork', 9.99, 6.99,  '2024-04-12', 'Alexanders Ham Emporium', '30000', 'Available', '14', '2024-04-10'),
('American Pepperoni Pizza', 'Classic American Dish Serves 1', 'Baked Goods', 35.00, 33.49,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '16', '2024-04-10'),
('Napolean Ice Cream', 'Strawberry, Vanilla, and Chocolate Icecream', 'Dairy', 25.49, 23.99,  '2024-04-16', 'The Kings Delight', '40000', 'Available', '30', '2024-04-10'),
('Imported Shephards Pie', 'A Classic Treat from Across the Pond', 'Beef', 49.49, 47.99,  '2024-04-20', 'The Kings Delight', '40000', 'Available', '42', '2024-04-10'),
('King Crab', 'King Crab Hand Caught by an Actual King, 1 Kilogram', 'Seafood', 89.49, 87.99,  '2024-04-19', 'The Kings Delight', '40000', 'Available', '171', '2024-04-10'),
('Beef Tacos', 'Ground Beef Tacos with Lettuce and Sour Cream', 'Beef', 4.99, 3.99,  '2024-04-12', 'Burrs Burritos', '30000', 'Available', '34', '2024-04-10'),
('Iceburg Letuce', '10 Inch Head of Iceburg Lettuce', 'Veggies', 6.49, 5.99,  '2024-04-13', 'Burrs Burritos', '30000', 'Available', '7', '2024-04-10'),
('Pineapple Flan', '10 Inch Flan Dessert with Pineapple Rings on Top', 'Dairy', 17.99, 12.49,  '2024-04-14', 'Burrs Burritos', '30000', 'Available', '40', '2024-04-10'),
('15in. Baguette', 'Authentic French Baguette, 15 inches', 'Baked Goods', 8.49, 5.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '1', '2024-04-10'),
('Oven Roasted Chicken', 'Whole Chicken Oven Roasted for 10 Hours', 'Poultry', 15.99, 11.49,  '2024-04-12', 'Le Marquis', '40000', 'Available', '11', '2024-04-10'),
('Strawberry Shortcake', 'Strawberry Shortcake with Homemade Whipped Cream, Single Serveing', 'Baked Goods', 5.00, 3.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '37', '2024-04-10'),
('Bakers Dozen Glazed Donuts', 'Glazed Donuts with Sweet Icing', 'Baked Goods', 13.00, 6.49,  '2024-04-13', 'Schuylers Sourbough', '30000', 'Available', '17', '2024-04-10'),
('Sourdough Loaf ', 'Hand Made Sourdough Bread Loaf', 'Baked Goods', 6.79, 4.49,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '25', '2024-04-10'),
('Veggie Party Platter', 'Party Platter of Various Fruits and Vegatables, Serves 8', 'Veggies', 13.89, 8.99,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '58', '2024-04-10'),
('Nigirizushi Sushi', 'Sliced Salmon on Rice', 'Seafood', 7.39, 3.99,  '2024-04-12', 'Diggs Diner', '30000', 'Available', '5', '2024-04-10'),
('18ct Extra Large Eggs', '18ct Cageless Eggs', 'Poultry', 4.99, 3.99,  '2024-04-15', 'Diggs Diner', '30000', 'Available', '6', '2024-04-10'),
('The Revolutionist', 'Sandwich with Ham, Bacon and Salami', 'Pork', 8.99, 6.49,  '2024-04-13', 'Diggs Diner', '30000', 'Available', '13', '2024-04-10'),

('Honey Glazed Bacon', '15oz of Applewood Bacon Glazed with Honey and Apices', 'Pork', 15.99, 8.99,  '2024-04-15', 'Alexanders Ham Emporium', '30000', 'Available', '63', '2024-04-10'),
('Pork Ribs', '30oz Pork Ribs Adorned with Cloves and Pineapple Rings for Extra Flavor.', 'Pork', 29.99, 10.99,  '2024-04-13', 'Alexanders Ham Emporium', '30000', 'Available', '140', '2024-04-10'),
('The Alexander Special', '8oz Bratwurst Grilled to Perfection.', 'Pork', 9.99, 6.99,  '2024-04-15', 'Alexanders Ham Emporium', '30000', 'Available', '14', '2024-04-10'),
('Beef Tacos', 'Ground Beef Tacos with Lettuce and Sour Cream', 'Beef', 4.99, 3.99,  '2024-04-12', 'Burrs Burritos', '30000', 'Available', '34', '2024-04-10'),
('Iceburg Letuce', '10 Inch Head of Iceburg Lettuce', 'Veggies', 6.49, 5.99,  '2024-04-15', 'Burrs Burritos', '30000', 'Available', '7', '2024-04-10'),
('Pineapple Flan', '10 Inch Flan Dessert with Pineapple Rings on Top', 'Dairy', 17.99, 12.49,  '2024-04-14', 'Burrs Burritos', '30000', 'Available', '40', '2024-04-10'),
('15in. Baguette', 'Authentic French Baguette, 15 inches', 'Baked Goods', 8.49, 5.49,  '2024-04-15', 'Le Marquis', '40000', 'Available', '1', '2024-04-10'),
('Oven Roasted Chicken', 'Whole Chicken Oven Roasted for 10 Hours', 'Poultry', 15.99, 11.49,  '2024-04-12', 'Le Marquis', '40000', 'Available', '11', '2024-04-10'),
('Strawberry Shortcake', 'Strawberry Shortcake with Homemade Whipped Cream, Single Serveing', 'Baked Goods', 5.00, 3.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '37', '2024-04-10'),
('American Pepperoni Pizza', 'Classic American Dish Serves 1', 'Baked Goods', 35.00, 33.49,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '16', '2024-04-10'),
('Napolean Ice Cream', 'Strawberry, Vanilla, and Chocolate Icecream', 'Dairy', 25.49, 23.99,  '2024-04-16', 'The Kings Delight', '40000', 'Available', '30', '2024-04-10'),
('Imported Shephards Pie', 'A Classic Treat from Across the Pond', 'Beef', 49.49, 47.99,  '2024-04-20', 'The Kings Delight', '40000', 'Available', '42', '2024-04-10'),
('King Crab', 'King Crab Hand Caught by an Actual King, 1 Kilogram', 'Seafood', 89.49, 87.99,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '171', '2024-04-10'),
('Bakers Dozen Glazed Donuts', 'Glazed Donuts with Sweet Icing', 'Baked Goods', 13.00, 6.49,  '2024-04-13', 'Schuylers Sourbough', '30000', 'Available', '17', '2024-04-10'),
('Sourdough Loaf ', 'Hand Made Sourdough Bread Loaf', 'Baked Goods', 6.79, 4.49,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '25', '2024-04-10'),
('Veggie Party Platter', 'Party Platter of Various Fruits and Vegatables, Serves 8', 'Veggies', 13.89, 8.99,  '2024-04-15', 'Schuylers Sourbough', '30000', 'Available', '58', '2024-04-10'),
('Nigirizushi Sushi', 'Sliced Salmon on Rice', 'Seafood', 7.39, 3.99,  '2024-04-12', 'Diggs Diner', '30000', 'Available', '5', '2024-04-10'),
('18ct Extra Large Eggs', '18ct Cageless Eggs', 'Poultry', 4.99, 3.99,  '2024-04-16', 'Diggs Diner', '30000', 'Available', '6', '2024-04-10'),
('The Revolutionist', 'Sandwich with Ham, Bacon and Salami', 'Pork', 8.99, 6.49,  '2024-04-13', 'Diggs Diner', '30000', 'Available', '13', '2024-04-10'),

('Honey Glazed Bacon', '15oz of Applewood Bacon Glazed with Honey and Apices', 'Pork', 15.99, 8.99,  '2024-04-14', 'Alexanders Ham Emporium', '30000', 'Available', '63', '2024-04-10'),
('Pork Ribs', '30oz Pork Ribs Adorned with Cloves and Pineapple Rings for Extra Flavor.', 'Pork', 29.99, 10.99,  '2024-04-14', 'Alexanders Ham Emporium', '30000', 'Available', '140', '2024-04-10'),
('The Alexander Special', '8oz Bratwurst Grilled to Perfection.', 'Pork', 9.99, 6.99,  '2024-04-14', 'Alexanders Ham Emporium', '30000', 'Available', '14', '2024-04-10'),
('Beef Tacos', 'Ground Beef Tacos with Lettuce and Sour Cream', 'Beef', 4.99, 3.99,  '2024-04-17', 'Burrs Burritos', '30000', 'Available', '34', '2024-04-10'),
('Iceburg Letuce', '10 Inch Head of Iceburg Lettuce', 'Veggies', 6.49, 5.99,  '2024-04-13', 'Burrs Burritos', '30000', 'Available', '7', '2024-04-10'),
('Pineapple Flan', '10 Inch Flan Dessert with Pineapple Rings on Top', 'Dairy', 17.99, 12.49,  '2024-04-14', 'Burrs Burritos', '30000', 'Available', '40', '2024-04-10'),
('15in. Baguette', 'Authentic French Baguette, 15 inches', 'Baked Goods', 8.49, 5.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '1', '2024-04-10'),
('Oven Roasted Chicken', 'Whole Chicken Oven Roasted for 10 Hours', 'Poultry', 15.99, 11.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '11', '2024-04-10'),
('Strawberry Shortcake', 'Strawberry Shortcake with Homemade Whipped Cream, Single Serveing', 'Baked Goods', 5.00, 3.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '37', '2024-04-10'),
('American Pepperoni Pizza', 'Classic American Dish Serves 1', 'Baked Goods', 35.00, 33.49,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '16', '2024-04-10'),
('Napolean Ice Cream', 'Strawberry, Vanilla, and Chocolate Icecream', 'Dairy', 25.49, 23.99,  '2024-04-16', 'The Kings Delight', '40000', 'Available', '30', '2024-04-10'),
('Imported Shephards Pie', 'A Classic Treat from Across the Pond', 'Beef', 49.49, 47.99,  '2024-04-20', 'The Kings Delight', '40000', 'Available', '42', '2024-04-10'),
('King Crab', 'King Crab Hand Caught by an Actual King, 1 Kilogram', 'Seafood', 89.49, 87.99,  '2024-04-19', 'The Kings Delight', '40000', 'Available', '171', '2024-04-10'),
('Bakers Dozen Glazed Donuts', 'Glazed Donuts with Sweet Icing', 'Baked Goods', 13.00, 6.49,  '2024-04-15', 'Schuylers Sourbough', '30000', 'Available', '17', '2024-04-10'),
('Sourdough Loaf ', 'Hand Made Sourdough Bread Loaf', 'Baked Goods', 6.79, 4.49,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '25', '2024-04-10'),
('Veggie Party Platter', 'Party Platter of Various Fruits and Vegatables, Serves 8', 'Veggies', 13.89, 8.99,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '58', '2024-04-10'),
('Nigirizushi Sushi', 'Sliced Salmon on Rice', 'Seafood', 7.39, 3.99,  '2024-04-12', 'Diggs Diner', '30000', 'Available', '5', '2024-04-10'),
('18ct Extra Large Eggs', '18ct Cageless Eggs', 'Poultry', 4.99, 3.99,  '2024-04-15', 'Diggs Diner', '30000', 'Available', '6', '2024-04-10'),
('The Revolutionist', 'Sandwich with Ham, Bacon and Salami', 'Pork', 8.99, 6.49,  '2024-04-13', 'Diggs Diner', '30000', 'Available', '13', '2024-04-10'),

('Honey Glazed Bacon', '15oz of Applewood Bacon Glazed with Honey and Apices', 'Pork', 15.99, 8.99,  '2024-04-12', 'Alexanders Ham Emporium', '30000', 'Available', '63', '2024-04-10'),
('Pork Ribs', '30oz Pork Ribs Adorned with Cloves and Pineapple Rings for Extra Flavor.', 'Pork', 29.99, 10.99,  '2024-04-12', 'Alexanders Ham Emporium', '30000', 'Available', '140', '2024-04-10'),
('The Alexander Special', '8oz Bratwurst Grilled to Perfection.', 'Pork', 9.99, 6.99,  '2024-04-12', 'Alexanders Ham Emporium', '30000', 'Available', '14', '2024-04-10'),
('Beef Tacos', 'Ground Beef Tacos with Lettuce and Sour Cream', 'Beef', 4.99, 3.99,  '2024-04-14', 'Burrs Burritos', '30000', 'Available', '34', '2024-04-10'),
('Iceburg Letuce', '10 Inch Head of Iceburg Lettuce', 'Veggies', 6.49, 5.99,  '2024-04-13', 'Burrs Burritos', '30000', 'Available', '7', '2024-04-10'),
('Pineapple Flan', '10 Inch Flan Dessert with Pineapple Rings on Top', 'Dairy', 17.99, 12.49,  '2024-04-14', 'Burrs Burritos', '30000', 'Available', '40', '2024-04-10'),
('15in. Baguette', 'Authentic French Baguette, 15 inches', 'Baked Goods', 8.49, 5.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '1', '2024-04-10'),
('Oven Roasted Chicken', 'Whole Chicken Oven Roasted for 10 Hours', 'Poultry', 15.99, 11.49,  '2024-04-12', 'Le Marquis', '40000', 'Available', '11', '2024-04-10'),
('Strawberry Shortcake', 'Strawberry Shortcake with Homemade Whipped Cream, Single Serveing', 'Baked Goods', 5.00, 3.49,  '2024-04-13', 'Le Marquis', '40000', 'Available', '37', '2024-04-10'),
('American Pepperoni Pizza', 'Classic American Dish Serves 1', 'Baked Goods', 35.00, 33.49,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '16', '2024-04-10'),
('Napolean Ice Cream', 'Strawberry, Vanilla, and Chocolate Icecream', 'Dairy', 25.49, 23.99,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '30', '2024-04-10'),
('Imported Shephards Pie', 'A Classic Treat from Across the Pond', 'Beef', 49.49, 47.99,  '2024-04-20', 'The Kings Delight', '40000', 'Available', '42', '2024-04-10'),
('King Crab', 'King Crab Hand Caught by an Actual King, 1 Kilogram', 'Seafood', 89.49, 87.99,  '2024-04-17', 'The Kings Delight', '40000', 'Available', '171', '2024-04-10'),
('Bakers Dozen Glazed Donuts', 'Glazed Donuts with Sweet Icing', 'Baked Goods', 13.00, 6.49,  '2024-04-12', 'Schuylers Sourbough', '30000', 'Available', '17', '2024-04-10'),
('Sourdough Loaf ', 'Hand Made Sourdough Bread Loaf', 'Baked Goods', 6.79, 4.49,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '25', '2024-04-10'),
('Veggie Party Platter', 'Party Platter of Various Fruits and Vegatables, Serves 8', 'Veggies', 13.89, 8.99,  '2024-04-14', 'Schuylers Sourbough', '30000', 'Available', '58', '2024-04-10'),
('Nigirizushi Sushi', 'Sliced Salmon on Rice', 'Seafood', 7.39, 3.99,  '2024-04-14', 'Diggs Diner', '30000', 'Available', '5', '2024-04-10'),
('18ct Extra Large Eggs', '18ct Cageless Eggs', 'Poultry', 4.99, 3.99,  '2024-04-13', 'Diggs Diner', '30000', 'Available', '6', '2024-04-10'),
('The Revolutionist', 'Sandwich with Ham, Bacon and Salami', 'Pork', 8.99, 6.49,  '2024-04-13', 'Diggs Diner', '30000', 'Available', '13', '2024-04-10');












-- Insert test data into the listing table
INSERT INTO listing (itemID, sellerID, createDate)
VALUES
    (1, 1, '2024-04-10'),
    (2, 1, '2024-04-10'),
    (3, 1, '2024-04-10'),
    (4, 3, '2024-04-10'),
    (5, 3, '2024-04-10'),
    (6, 3, '2024-04-10'),
    (7, 3, '2024-04-10'),
    (8, 2, '2024-04-10'),
    (9, 2, '2024-04-10'),
    (10, 2, '2024-04-10'),
    (11, 4, '2024-04-10'),
    (12, 4, '2024-04-10'),
    (13, 4, '2024-04-10'),
    (14, 5, '2024-04-10'),
    (15, 5, '2024-04-10'),
    (16, 5, '2024-04-10'),
    (17, 6, '2024-04-10'),
    (18, 6, '2024-04-10'),
    (19, 6, '2024-04-10'),


    (20, 1, '2024-04-10'),
    (21, 1, '2024-04-10'),
    (22, 1, '2024-04-10'),
    (23, 3, '2024-04-10'),
    (24, 3, '2024-04-10'),
    (25, 3, '2024-04-10'),
    (26, 3, '2024-04-10'),
    (27, 2, '2024-04-10'),
    (28, 2, '2024-04-10'),
    (29, 2, '2024-04-10'),
    (30, 4, '2024-04-10'),
    (31, 4, '2024-04-10'),
    (32, 4, '2024-04-10'),
    (33, 5, '2024-04-10'),
    (34, 5, '2024-04-10'),
    (35, 5, '2024-04-10'),
    (36, 6, '2024-04-10'),
    (37, 6, '2024-04-10'),
    (38, 6, '2024-04-10'),

    (39, 1, '2024-04-10'),
    (40, 1, '2024-04-10'),
    (41, 1, '2024-04-10'),
    (42, 3, '2024-04-10'),
    (43, 3, '2024-04-10'),
    (44, 3, '2024-04-10'),
    (45, 3, '2024-04-10'),
    (46, 2, '2024-04-10'),
    (47, 2, '2024-04-10'),
    (48, 2, '2024-04-10'),
    (19, 4, '2024-04-10'),
    (50, 4, '2024-04-10'),
    (51, 4, '2024-04-10'),
    (52, 5, '2024-04-10'),
    (53, 5, '2024-04-10'),
    (54, 5, '2024-04-10'),
    (55, 6, '2024-04-10'),
    (56, 6, '2024-04-10'),
    (57, 6, '2024-04-10'),
    
    (58, 1, '2024-04-10'),
    (59, 1, '2024-04-10'),
    (60, 1, '2024-04-10'),
    (61, 3, '2024-04-10'),
    (62, 3, '2024-04-10'),
    (63, 3, '2024-04-10'),
    (64, 3, '2024-04-10'),
    (65, 2, '2024-04-10'),
    (66, 2, '2024-04-10'),
    (67, 2, '2024-04-10'),
    (68, 4, '2024-04-10'),
    (69, 4, '2024-04-10'),
    (70, 4, '2024-04-10'),
    (71, 5, '2024-04-10'),
    (72, 5, '2024-04-10'),
    (73, 5, '2024-04-10'),
    (74, 6, '2024-04-10'),
    (75, 6, '2024-04-10'),
    (76, 6, '2024-04-10');




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

    (1, 'Alexanders Ham Emporium', '123 Federalist Avenue', ' New York City', 'New York', '30000', '555-987-6543', 'HamEmporium@gmail.com', 'http://www.HamEmporium.com'),
    (2, 'Burrs Burritos', '456 Duelers Drive', ' New York City', 'New York', '30000', '555-555-5555', 'BurrsBurritos@gmail.com', 'http://www.BurrsBurritos.com'),
    (3, 'The Kings Delight', '345 Monarch Dr', 'London', 'Georgia', '40000', '555-444-3333', 'KingsDelight@gmail.com', 'http://www.KingsDelight.com'),
    (4, 'Le Marquis ', '567 Liberty Lane', 'Paris', 'Georgia', '40000', '555-222-3333', 'Marquis@gmail.com', 'http://www.Marquis.com'),
    (5, 'Schuylers Sourbough', '789 Schuyler Street', ' New York City', 'New York', '30000', '555-111-2222', 'SchuylersSourbough@gmail.com', 'http://www.SchuylersSourbough.com'),
    (6, 'Diggs Diner', '678 Republic Road', 'New York City', ' New York', '30000', '555-666-7777', 'DiggsDiner@gmail.com', 'http://www.Diggs Diner.com');
