USE goPartyDatabase;

INSERT INTO Sellers (UserID, StoreName, StoreDescription, MainService, ServiceDays, ServiceArea, ServiceType, StoreRating)
VALUES (95, 'test store', 'test description', 'balloons', 'Weekends', 'MA', 'delievery', 3.14);

select * from Sellers;