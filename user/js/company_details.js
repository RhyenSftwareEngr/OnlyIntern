const userID = document.getElementById('userID').value;

$.ajax({
    url: '../api/company_details.php',
    type: 'GET',
    data: { id: userID },
    dataType: 'json',
    success: function(response) {
        console.log(response)
        const companyNameElement = document.getElementById('companyName');
        const companyAddressElement = document.getElementById('companyAddress');
        const companyEmailElement = document.getElementById('companyEmail');
        const companyPhoneNoElement = document.getElementById('companyPhoneNo');
        const supFNameElement = document.getElementById('companySFName');
        const supMNameElement = document.getElementById('companySMName');
        const supLNameElemet = document.getElementById('companySLName');
        const supRoleElement = document.getElementById('companySRole');
        const submitButton = document.getElementById('submit-button');

        if (!$.trim(response)){   
            var originalValues = {
                companyName: "",
                companyAddress: "",
                companyEmail: "",
                companyPhoneNo: "",
                svFirst: "",
                svMiddle: "",
                svLast: "",
                svRole: ""
            };
            
            function setTextBoxValues() {
                companyNameElement.value = originalValues.companyName;
                companyAddressElement.value = originalValues.companyAddress;
                companyEmailElement.value = originalValues.companyEmail;
                companyPhoneNoElement.value = originalValues.companyPhoneNo;
                supFNameElement.value = originalValues.svFirst;
                supMNameElement.value = originalValues.svMiddle;
                supLNameElemet.value = originalValues.svLast;
                supRoleElement.value = originalValues.svRole;
            }
            
            setTextBoxValues();
            
            function checkChanges() {
                const companyName = companyNameElement.value;
                const companyAddress = companyAddressElement.value;
                const companyEmail = companyEmailElement.value;
                const companyPhoneNo = companyPhoneNoElement.value;
                const supFName = supFNameElement.value;
                const supMName = supMNameElement.value;
                const supLName = supLNameElemet.value;
                const supRole = supRoleElement.value;
            
                if (
                    companyName !== originalValues.companyName ||
                    companyAddress !== originalValues.companyAddress ||
                    companyEmail !== originalValues.companyEmail ||
                    companyPhoneNo !== originalValues.companyPhoneNo ||
                    supFName !== originalValues.svFirst ||
                    supMName !== originalValues.svMiddle ||
                    supLName !== originalValues.svLast ||
                    supRole !== originalValues.svRole
                ) {
                    submitButton.disabled = false;
                } else {
                    submitButton.disabled = true;
                }
            }
            
            companyNameElement.addEventListener('input', checkChanges);
            companyAddressElement.addEventListener('input', checkChanges);
            companyEmailElement.addEventListener('input', checkChanges);
            companyPhoneNoElement.addEventListener('input', checkChanges);
            supFNameElement.addEventListener('input', checkChanges);
            supMNameElement.addEventListener('input', checkChanges);
            supLNameElemet.addEventListener('input', checkChanges);
            supRoleElement.addEventListener('input', checkChanges);

            companyNameElement.required = true;
            companyAddressElement.required = true;
            companyEmailElement.required = true;
            companyPhoneNoElement.required = true;
            supFNameElement.required = true;
            supMNameElement.required = true;
            supLNameElemet.required = true;
            supRoleElement.required = true;

            function uploadData() {
                if (companyNameElement.value &&
                    companyAddressElement.value &&
                    companyEmailElement.value &&
                    companyPhoneNoElement.value &&
                    supFNameElement.value &&
                    supMNameElement.value &&
                    supLNameElemet.value &&
                    supRoleElement.value) {
                        function setBorderColorRed(element) {
                            if (!element.value) {
                                element.style.borderColor = "red";
                            } else {
                                element.style.borderColor = "black";
                            }
                        }
                        
                        // Set the border color to red for the required elements
                        setBorderColorRed(companyNameElement);
                        setBorderColorRed(companyAddressElement);
                        setBorderColorRed(companyEmailElement);
                        setBorderColorRed(companyPhoneNoElement);
                        setBorderColorRed(supFNameElement);
                        setBorderColorRed(supMNameElement);
                        setBorderColorRed(supLNameElemet);
                        setBorderColorRed(supRoleElement);
                        
                        $.ajax({
                            url: '../api/user_upload.php',
                            type: 'POST',
                            data: { 
                                stud_id: userID,
                                company_name: companyNameElement.value,
                                company_address: companyAddressElement.value,
                                company_email: companyEmailElement.value,
                                company_phone: companyPhoneNoElement.value,
                                sup_fname: supFNameElement.value,
                                sup_mname: supMNameElement.value,
                                sup_lname: supLNameElemet.value,
                                sup_role: supRoleElement.value 
                            }, // Pass the ID as a parameter
                            dataType: 'json',
                            success: function(response) {
                                console.log(response.message);
                                document.getElementById("overlay").style.display = "block";
                                document.getElementById("popup").style.display = "block";
                                companyNameElement.disabled = true;
                                companyAddressElement.disabled = true;
                                companyEmailElement.disabled = true;
                                companyPhoneNoElement.disabled = true;
                                supFNameElement.disabled = true;
                                supMNameElement.disabled = true;
                                supLNameElemet.disabled = true;
                                supRoleElement.disabled = true;
                                submitButton.remove();
                            },
                            error: function(error) {
                                console.log('Error fetching JSON:', error);
                            }
                        });
                    } else {
                        function setBorderColorRed(element) {
                            if (!element.value) {
                                element.style.borderColor = "red";
                            } else {
                                element.style.borderColor = "black";
                            }
                        }
                        
                        // Set the border color to red for the required elements
                        setBorderColorRed(companyNameElement);
                        setBorderColorRed(companyAddressElement);
                        setBorderColorRed(companyEmailElement);
                        setBorderColorRed(companyPhoneNoElement);
                        setBorderColorRed(supFNameElement);
                        setBorderColorRed(supMNameElement);
                        setBorderColorRed(supLNameElemet);
                        setBorderColorRed(supRoleElement);

                    }

                
            }

            submitButton.addEventListener("click", uploadData)
        }
        else{   
            var originalValues = {
                companyName: response.company_name,
                companyAddress: response.comp_address,
                companyEmail: response.comp_email,
                companyPhoneNo: response.comp_phone,
                svFirst: response.sup_first_name,
                svMiddle: response.sup_middle_name,
                svLast: response.sup_last_name,
                svRole: response.sup_role
            };

            function setTextBoxValues() {
                companyNameElement.value = originalValues.companyName;
                companyAddressElement.value = originalValues.companyAddress;
                companyEmailElement.value = originalValues.companyEmail;
                companyPhoneNoElement.value = originalValues.companyPhoneNo;
                supFNameElement.value = originalValues.svFirst;
                supMNameElement.value = originalValues.svMiddle;
                supLNameElemet.value = originalValues.svLast;
                supRoleElement.value = originalValues.svRole;
            }
            
            setTextBoxValues();
            
            companyNameElement.disabled = true;
            companyAddressElement.disabled = true;
            companyEmailElement.disabled = true;
            companyPhoneNoElement.disabled = true;
            supFNameElement.disabled = true;
            supMNameElement.disabled = true;
            supLNameElemet.disabled = true;
            supRoleElement.disabled = true;
            submitButton.remove();
        }

    },
    error: function(error) {
        console.error('Error fetching JSON:', error);
    }
});