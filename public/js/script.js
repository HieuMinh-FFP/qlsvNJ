//jqClick
$('button.destroy').click(function (e) {
	e.preventDefault();
	const data_href = $(this).attr('data-href');
	$('#exampleModal a').attr('href', data_href);
});
const gotoPage = (page) => {
	// window.location.href: https://qlsv.com/?page=3%conga=4&convit=3
	const currentURL = window.location.href;
	const obj = new URL(currentURL);
	obj.searchParams.set('page', page);
	// window.location.href = https://qlsv.com/?page=3%conga=4&convit=3
	// nghia la trinh duyet tự động chạy tới đường link: https://qlsv.com/?page=3%conga=4&convit=3
	window.location.href = obj.href;
};
$(".form-student-create, .form-student-edit").validate({
	rules: {
		// simple rule, converted to {required:true}
		name: {
			required: true,
			// không chứa số hoặc ký tự đặc biệt
			regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i,
			maxlength: 50
		},
		// compound rule
		birthday: {
			required: true,
			// email: true
		},
		gender: {
			required: true,
			// email: true
		}
	},
	messages: {
		// simple rule, converted to {required:true}
		name: {
			required: 'Vui lòng nhập họ và tên',
			regex: ' Vui lòng không nhập số hoặc ký tự đặc biệt',
			maxlength: 'Vui lòng không nhập quá 50 ký tự'
		},
		// compound rule
		birthday: {
			required: 'Vui lòng chọn ngày tháng năm sinh',
			// email: true
		},
		gender: {
			required: 'Vui lòng chọn giới tính',
			// email: true
		}
	}

});
$(".form-subject-create, .form-subject-edit").validate({
	rules: {
		// simple rule, converted to {required:true}
		name: {
			required: true,
			regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i,
			// không chứa số hoặc ký tự đặc biệt

			maxlength: 50
		},
		// compound rule
		number_of_credit: {
			required: true,
			// digist: số nguyên
			digits: true,
			range: [1, 10]
			// email: true
		},

	},
	messages: {
		// simple rule, converted to {required:true}
		name: {
			required: 'Vui lòng nhập tên môn học',
			regex: 'Vui lòng không nhập ký tự đặc biệt',
			maxlength: 'Vui lòng không nhập quá 50 ký tự'
		},
		// compound rule
		number_of_credit: {
			required: 'Vui lòng nhập số chứng chỉ',
			digits: 'vui lòng nhập số nguyên',
			range: 'vui lòng nhập số từ 1 đến 10'
			// email: true
		}
	}

});
$(".form-register-create").validate({
	rules: {
		// simple rule, converted to {required:true}
		student_id: {
			required: true,
			// không chứa số hoặc ký tự đặc biệt

			maxlength: 50
		},
		// compound rule
		subject_id: {
			required: true,
			// digist: số nguyên
			// email: true
		},

	},
	messages: {
		// simple rule, converted to {required:true}
		student_id: {
			required: 'Vui lòng chọn sinh viên',
			maxlength: 'Vui lòng không nhập quá 50 ký tự'
		},
		// compound rule
		subject_id: {
			required: 'Vui lòng chọn môn học',
			digits: 'vui lòng nhập số nguyên',
			range: 'vui lòng nhập số từ 1 đến 10'
			// email: true
		}
	}

});
$(".form-register-edit").validate({
	rules: {
		// simple rule, converted to {required:true}
		score: {
			required: true,
			// không chứa số hoặc ký tự đặc biệt

			range: [0, 10]
		}



	},
	messages: {
		// simple rule, converted to {required:true}
		score: {
			required: 'Vui lòng nhập điểm',
			range: 'Vui lòng nhập điểm thi từ 0 đến 10'
		}
		// compound rule

	}

});
$.validator.addMethod(
	"regex",
	function (value, element, regexp) {
		var re = new RegExp(regexp);
		return this.optional(element) || re.test(value);
	},
	"Please check your input."
);