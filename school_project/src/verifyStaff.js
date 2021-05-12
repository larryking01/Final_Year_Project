let temporaryArray = []
       
        if(staffID.length < 1 && staffPIN.length < 1) {
            // modal goes in here later.
            alert('You need to enter a valid staff ID and pin to continue')
        } else if(staffID.length < 1 && staffPIN.length > 1) {
            alert('No staff ID entered. Enter a valid staff ID to continue')
        } else if(staffID.length > 1 && staffPIN.length < 1) {
            alert('No PIN entered. Enter a matching pin to continue')
        } else {
            let staffLoginCollection = projectFirestore.collection('Staff Login Collection')
            staffLoginCollection.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    temporaryArray.push({...doc.data() })
                })
                setLoginsArray(temporaryArray)
                console.log(loginsArray)

                // verifying that there is a matching user
                let verify = loginsArray.filter(eachItem => ( 
                    eachItem.staffID === staffID && eachItem.pin === staffPIN))
                if(verify.length > 0) {
                    // link to main page
                    alert('verification successful')
                    router.push('/viewallstudents')

                }
                else {
                    // modal goes here
                    alert('Your staff ID and pin does not match. Please make sure you have entered the right credentials to continue')
                }

            })
     
        }
