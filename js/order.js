        window.onload = function()
        {
            $(".form-control").focus(obojiLabelu);
            $(".form-control").focusout(defaultLabela)
            this.dohvatiProizvode();
            $("#inputState").change(function()
            {
                if($(this).val() == 2)
                {
                    $("#creditCard").addClass("d-block");
                }
                else
                {
                    $("#creditCard").removeClass("d-block");
                }
            })
        }
        function obojiLabelu()
        {
            $(this).prev().addClass("labelBoja")
        };
        function defaultLabela()
        {
            $(this).prev().removeClass("labelBoja")
        }
        var regexAdresa = /^([A-ZČĆĐŠŽ][a-zčćđšž\.]+)(\s[A-zČĆĐŠŽčćđšž][a-zčćđšž]+)*\s?(([0-9\w]{2,4})|([0-9]))$/;
        var regexBrojTelefona = /^((\+3816[0-9]{7,9})|(06[0 1 2 3 4 5 6 9][0-9]{6,7}))$/;
        var regexPrezime =  /^([A-ZČĆĐŠŽ][a-zčćđšž]{2,30})(\s[A-ZČĆĐŠŽ][a-zčćđšž]{2,30})*$/;
        var regexIme = /^[A-ZČĆĐŠŽ][a-zčćđšž]{2,29}$/;
        function dohvatiProizvode()
        {
            $.ajax(
                {
                    method : "GET",
                    url : "data/products.json",
                    dataType : "json",
                    success: function(data)
                    {
                        popuniDDL(data);
                    },
                    error: function(xhr, status, error)
                    {
            
                    }
                });
        }
        function popuniDDL(data)
        {
            let select = ``;
            for (let p of data)
            {
                select += `<option value="${p.id}" class="vermin"> ${p.name} </option>`;
            }
            document.getElementById("product").innerHTML += select;
        }
        function validate()
        {
            let ide = true;
            let imeTag = $("#inputName4");
            let ime = imeTag.val();
            let regexIme = /^[A-ZČĆĐŠŽ][a-zčćđšž]{2,29}$/;
            if(!ime.match(regexIme))
            {
                imeTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                imeTag.next().removeClass("d-block");
            }
            let prezimeTag = $("#inputLastName4");
            let prezime = prezimeTag.val();
            let regexPrezime =  /^([A-ZČĆĐŠŽ][a-zčćđšž]{2,30})(\s[A-ZČĆĐŠŽ][a-zčćđšž]{2,30})*$/;
            if(!prezime.match(regexPrezime))
            {
                prezimeTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                prezimeTag.next().removeClass("d-block");
            }
            let proizvodTag = $("#product");
            let proizvod = proizvodTag.val();
            if(proizvod == 0)
            {
                proizvodTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                proizvodTag.next().removeClass("d-block");
            }
            let adresaTag = $("#inputAddress");
            let adresa = adresaTag.val();
            let regexAdresa = /^([A-ZČĆĐŠŽ][a-zčćđšž\.]+)(\s[A-zČĆĐŠŽčćđšž][a-zčćđšž]+)*\s?(([0-9\w]{2,4})|([0-9]))$/;
            if (!adresa.match(regexAdresa))
            {
                adresaTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                adresaTag.next().removeClass("d-block");
            }
            let gradTag = $("#inputCity2");
            let grad = gradTag.val();
            let regexGrad = /^[A-ZĐŽĆŠČ]+[a-zđžćšč]{2,30}$/;
            if(!grad.match(regexGrad))
            {
                gradTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                gradTag.next().removeClass("d-block");
            }
            let telefonTag = $("#inputNumber");
            let telefon = telefonTag.val();
            let regexBrojTelefona = /^[\+]?([0-9]){9,25}$/;
            if(!telefon.match(regexBrojTelefona))
            {
                telefonTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                telefonTag.next().removeClass("d-block");
            }
            let emailTag = $("#inputEmail");
            let email = emailTag.val();
            let regexEmail = /^[a-z]+[0-9a-z]*@[a-z]{2,10}(\.[a-z]{2,10})+$/;
            if(!email.match(regexEmail))
            {
                emailTag.next().addClass("d-block");
                ide = false;
            }
            else
            {
                emailTag.next().removeClass("d-block");
            }
            let placanje = $("#inputState").val();
            if(placanje != 0)
            {
                $("#inputState").next().removeClass("d-block");
                if(placanje == 2)
                {
                    let ccNumber = $("#CCnumber").val();
                    let regexCCNumber = /^[0-9][0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9]$/
                    if(!ccNumber.match(regexCCNumber))
                    {
                        $("#CCnumber").next().addClass("d-block");
                        ide = false;
                    }
                    else
                    {
                        $("#CCnumber").next().removeClass("d-block");
                    }
                }
            }
            else
            {
                $("#inputState").next().addClass("d-block");
            }
            if(ide)
            {
                alert("Form successfully sent! Check your email!");
            }
            return ide;
        }