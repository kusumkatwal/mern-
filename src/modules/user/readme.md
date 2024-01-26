USER API : 
    /admin/users        ==>get Request ===> All Users
        using filter
            /admin/users?role=seller ===> get Request ===> All the sellers
            /admin/users?role=customer ===> get Request ===> All the Customers
    /admin/user/:id ==> Put Request ===> Update user
                //name, phone, address, image
    /admin/user/:id ===> Delete Request ===> User Delete
    /admin/user/:id/change-password ===> get Request ==> Forget Password Flow 