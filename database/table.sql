

CREATE TABLE `category` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL UNIQUE,
  `Description` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
)

CREATE TABLE `role` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL UNIQUE,
  `code` varchar(120) NOT NULL UNIQUE,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
)

CREATE TABLE `customer` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Firstname` varchar(120) NOT NULL,
  `Lastname` varchar(120) NOT NULL,
  `Gender` tinyint(1) DEFAULT 1,
  `Dob` datetime DEFAULT NULL,
  `Tel` varchar(120) NOT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Addres` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);

CREATE TABLE `employee` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `RoleId` int(11),
  `Firstname` varchar(120) NOT NULL,
  `Lastname` varchar(120) NOT NULL,
  `Gender` tinyint(1) DEFAULT 1,
  `Dob` datetime DEFAULT NULL,
  `Tel` varchar(120) NOT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Addres` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `Image` varchar(255) DEFAULT NULL,
  `Salary` DECIMAL(6,2) DEFAULT 0,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);


CREATE TABLE `supplier` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL,
  `Tel` varchar(120) NOT NULL,
  `Email` varchar(120) NOT NULL,
  `Addres` text NOT NULL,
  `WebsiteUrl` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);

CREATE TABLE `purchase` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `EmployeeId` int(11),
  `SupplierId` int(11),
  `PurchaeStatus` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL,
  `PurchaseAt` datetime NOT NULL
);


CREATE TABLE `purchase_product` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `PurchaseId` int(11),
  `ProductId` int(11),
  `Qty` int(11) DEFAULT 1,
  `Price` DECIMAL(7,2) DEFAULT 0,
  `ProductStatus` text DEFAULT NULL
);

CREATE TABLE `product` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `CategoryId` int(11),
  `Description` text DEFAULT NULL,
  `Qty` int(6) DEFAULT 0,
  `Price` DECIMAL(7,2) DEFAULT 0,
  `Discount` DECIMAL(7,2) DEFAULT 0,
  `Image` varchar(255) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);

CREATE TABLE `product_image` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `ProductId` int(11),
  `Image` varchar(255) NOT NULL,
  `Status` tinyint(1) DEFAULT 1
);

CREATE TABLE `invoice` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `CustomerId` int(11),
  `EmployeeId` int(11),
  `OrderStatusId` int(11),
  `OrderPaymentMethodId` int(11),
  `TotalQty` DECIMAL(7,2) DEFAULT 0,
  `TotalAmount` DECIMAL(7,2) DEFAULT 0,
  `TotalPaid` DECIMAL(7,2) DEFAULT 0,
  `Note` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);

CREATE TABLE `invoice_details` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `InvoiceId` int(11),
  `ProductId` int(11),
  `Qty` int(11) DEFAULT 1,
  `Price`  DECIMAL(7,2) DEFAULT 0,
  `Discount` DECIMAL(3,2) DEFAULT 0
);


CREATE TABLE `order_payment_method` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL UNIQUE,
  `Code` varchar(120) NOT NULL UNIQUE,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);


CREATE TABLE `order_status` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(120) NOT NULL UNIQUE,
  `Code` varchar(120) NOT NULL UNIQUE,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `CreateBy` int(11) DEFAULT NULL,
  `UpdateAt` datetime,
  `UpdateBy` int(11) DEFAULT NULL
);

ALTER TABLE product 
ADD FOREIGN KEY (CategoryId) REFERENCES category(Id);



ALTER TABLE employee 
ADD FOREIGN KEY (RoleId) REFERENCES role(Id);

ALTER TABLE invoice 
ADD FOREIGN KEY (CustomerId) REFERENCES customer(Id),
ADD FOREIGN KEY (OrderStatusId) REFERENCES order_status(Id),
ADD FOREIGN KEY (OrderPaymentMethodId) REFERENCES order_payment_method(Id),
ADD FOREIGN KEY (EmployeeId) REFERENCES employee(Id);

ALTER TABLE invoice_details 
ADD FOREIGN KEY (InvoiceId) REFERENCES invoice(Id),
ADD FOREIGN KEY (ProductId) REFERENCES product(Id);

ALTER TABLE product_image 
ADD FOREIGN KEY (ProductId) REFERENCES product(Id);


ALTER TABLE purchase 
ADD FOREIGN KEY (EmployeeId) REFERENCES employee(Id),
ADD FOREIGN KEY (SupplierId) REFERENCES supplier(Id);

ALTER TABLE purchase_product
ADD FOREIGN KEY (PurchaseId) REFERENCES purchase(Id),
ADD FOREIGN KEY (ProductId) REFERENCES product(Id);







Id(PK)
    Firstname
    Lastname
    Gender
    Dob
    Tel 
    Email
    Adress
    Status 
    CreateAt