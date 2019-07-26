function updateOutput() { 
		//get form
		var form = document.getElementById("inform");
		//get output
		var out = form.elements["amountinword"];
		//get amount to convert
		var num1 = parseFloat(form.elements["amount"].value);
		//get choosed currency
		var currency = parseInt(form.elements["currency"].value);
		//set output depending on currency
		switch(currency)
		{
		// Euro
		case 0:
		out.value =NumberToWordLT( num1, "eur" );
		break;
	  	// Lit old currency
	  	case 1: 
	  	out.value =NumberToWordLT( num1, "lit" );
	  	break;
	  	default:
	  	break;
	  }
	}


	function Left(str, n) {
		if (n <= 0) return "";
		else if (n > String(str).length) return str;
		else return String(str).toString().substr(0, n);
	}

	function Right(str, n) {
		if (n <= 0) return "";
		else if (n > str.toString().length) return str;
		else {
			var iLen = str.toString().length;
			return str.toString().substr(iLen - n, n);
		}
	}

	function MidStr2(strInput, intStart) {
		return String(strInput).toString().substr(intStart, strInput.toString().length);
	}

	function MidStr(strInput, intStart, intLength) {
		return String(strInput).toString().substr(intStart, intLength);
	}

	function InStr(myText, str) {
		return myText.toString().indexOf(str);
	}


//=======================================================================
  // Converts a number from 1 to 9 into text in Lithuanian. 
  function GetNumberLT(Digit) {

  	Digit = parseInt(Digit);

  	switch (Digit) {
  		case 1:
  		return "vienas";
  		case 2:
  		return "du";
  		case 3:
  		return "trys";
  		case 4:
  		return "keturi";
  		case 5:
  		return "penki";
  		case 6:
  		return "šeši";
  		case 7:
  		return "septyni";
  		case 8:
  		return "aštuoni";
  		case 9:
  		return "devyni";
  		default:
  		return "";
  	}
  }

// Converts a number from 10 to 99 into text in Lithuanian.
function GetTensLT(NumberText) {

	NumberText = parseInt(NumberText);

	var digit0 = parseInt(NumberText.toString().substr(1));
	var digit1 = parseInt(NumberText.toString().substr(0, 1));

	var Result = "";

	if (digit1 == 1) {
		switch (NumberText) {
			case 10:
			Result = "dešimt";
			break;
			case 11:
			Result = "vienuolika";
			break;
			case 12:
			Result = "dvylika";
			break;
			case 13:
			Result = "trylika";
			break;
			case 14:
			Result = "keturiolika";
			break;
			case 15:
			Result = "penkiolika";
			break;
			case 16:
			Result = "šešiolika";
			break;
			case 17:
			Result = "septyniolika";
			break;
			case 18:
			Result = "aštuoniolika";
			break;
			case 19:
			Result = "devyniolika";
			break;
		}
	} else {
		switch (digit1) {
			case 2:
			Result = "dvidešimt";
			break;
			case 3:
			Result = "trisdešimt";
			break;
			case 4:
			Result = "keturiasdešimt";
			break;
			case 5:
			Result = "penkiasdešimt";
			break;
			case 6:
			Result = "šešiasdešimt";
			break;
			case 7:
			Result = "septyniasdešimt";
			break;
			case 8:
			Result = "aštuoniasdešimt";
			break;
			case 9:
			Result = "devyniasdešimt";
			break;
		}

		Result = Result + " " + GetNumberLT(digit0);
		Result = Result.trim();
	}

	return Result;
}

function GetHundredsLT(NumberText) {

	NumberText = parseInt(NumberText);

	var Result = "",
	first_digit="",
	hundred_end="";

	if (NumberText == 0) return "Nulis";

	var strNumberText = "000" + NumberText.toString();
	strNumberText = Right(strNumberText, 3);

    // Convert the hundreds 
    if (MidStr(strNumberText, 0, 1) != "0") {
    	first_digit = MidStr(strNumberText, 0, 1);
    	if (first_digit == '1' ) {
    		hundred_end=" šimtas";
    	}else {
    		hundred_end=" šimtai";
    	}
    	Result = GetNumberLT(MidStr(strNumberText, 0, 1)) + hundred_end;
    }

    // Convert the tens and ones number.
    if (MidStr(strNumberText, 1, 1) != "0") {
    	Result = Result + " " + GetTensLT(MidStr2(strNumberText, 1));
    } else {
    	Result = Result + " " + GetNumberLT(MidStr2(strNumberText, 2));
    }

    return Result;

}

function NumberToWordLT(NumberText, currency ) {

	var AmountInWord = "",
	Cents_str = "",
	Temp, Cents=0;
	var int_digit = parseInt(NumberText);
	var last_digitStr = "";
	var last_digitint =0;
	var digit2Str = "";
	var digit2int = 0;	
	var DecimalBigNumber = "",
	Count;
	var Minus = "";
	var currency_text="";
	var dg_end = "";

	var bigNumber = new Array(5);

	bigNumber[0] = "";
	bigNumber[1] = "tūkstan";
	bigNumber[2] = "milijon";
	bigNumber[3] = "billion";
	bigNumber[4] = "trillion";

	if ( NumberText < 0) {
		Minus = "Minus ";
		NumberText = NumberText*-1;
	}


	NumberText = Math.round(NumberText * 100) / 100;

	DecimalBigNumber = InStr(NumberText, ".")

	if (DecimalBigNumber > 0) {
		Cents_str = Left(MidStr2(NumberText, DecimalBigNumber + 1) + "00", 2);
		NumberText = Left(NumberText, DecimalBigNumber).trim();
	}


	last_digitStr = Right(int_digit.toString(),1);
	last_digitint = parseInt(last_digitStr);

	digit2Str = Right(NumberText, 2);
	digit2int = parseInt(digit2Str);

	if ((digit2int > 10) && (digit2int < 20))
	{
		currency_text = currency + "ų ";
	}
	else
	{
		if (last_digitint == 0)
		{
			currency_text = currency + "ų ";
		}
		else if (last_digitint == 1)
		{
			currency_text = currency + "as ";
		}
		else
		{
			currency_text = currency + "ai ";
		}
	}



	Count = 0;

	do {
		Temp = GetHundredsLT(Right(NumberText, 3));

		if (Temp != "" && Temp !="Nulis") {
			dg_end ="";
			last_digitStr = Right( NumberText.toString(), 1);
			last_digitint = parseInt(last_digitStr);

			digit2Str = Right(NumberText, 2);
			digit2int = parseInt(digit2Str);

			if (Count == 1){
				if ((digit2int > 10) && (digit2int < 20) ) {
					dg_end = bigNumber[Count] + "čių";
				} else {
					if (last_digitint == 0 ) {
						dg_end = bigNumber[Count] + "čių";
					}
					else if( last_digitint == 1) {
						dg_end = bigNumber[Count] + "tis";
					} else{
						dg_end = bigNumber[Count] + "čiai";
					}
				}

			}
			else if (Count > 1)
			{
				if ((digit2int > 10) && (digit2int < 20)) {
					dg_end = bigNumber[Count] + "ų";
				}
				else {
					if (last_digitint == 0) {
						dg_end = bigNumber[Count] + "ų";
					}
					else if (last_digitint == 1) {
						dg_end = bigNumber[Count] + "as";
					}
					else {
						dg_end = bigNumber[Count] + "ai";
					}
				}
			}
			AmountInWord = Temp +" "+ dg_end + " " + AmountInWord.trim();
		}

		if (NumberText.toString().length > 3) {
			NumberText = Left(NumberText, NumberText.toString().length - 3);
		} else {
			NumberText = "";
		}

		Count++;
	}

	while (NumberText != "");

	AmountInWord = AmountInWord.trim();
	if (int_digit == 0) AmountInWord = "nulis";
	if (Cents_str[0]=='0') Cents_str = Cents_str.substr(1, 1);
	if (Cents_str =='') Cents_str="0";    
	Cents=parseInt(Cents_str.toString());
	Cents_str = " " + Cents + " ct.";

	//change first letter to uppercase.
	var fs_letter = AmountInWord.charAt(0);
	var up_letter = fs_letter.toUpperCase();
	AmountInWord = up_letter + AmountInWord.substr(1, AmountInWord.length -1).trim();


	return Minus+AmountInWord + " " + currency_text + Cents_str;

}
