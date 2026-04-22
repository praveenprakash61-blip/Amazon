Feature:Ecommerce validation

  Scenario: Placing the Order 
  Given a login to e-commerce application with 'username' and 'password'
    When add 'Zara code 4' iteam to cart 
    Then 