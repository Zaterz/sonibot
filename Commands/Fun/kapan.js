module.exports = {
  name: ["kapan","kapankah"],
  desc: "Kapan?",
  args: true,
  exec: data => {
	const kapan = ["Besok", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Bulan depan", "hari", "hari", "hari", "hari", "hari", "hari", "hari",
            "hari", "2 Bulan lagi", "3 Bulan lagi", "4 Bulan lagi", "5 Bulan lagi", "6 Bulan lagi", "7 Bulan lagi", "8 Bulan lagi", "9 Bulan lagi", "10 Bulan lagi", "11 Bulan lagi", "12 Bulan lagi", "Seminggu lagi", "2 Minggu lagi", "3 Minggu lagi", "4 Minggu lagi", "5 Minggu lagi", "hari", "Setahun lagi", "Dua tahun lagi", "Tiga tahun lagi", "Empat tahun lagi", "hari", "5 Tahun lagi", "6 Tahun lagi", "7 Tahun lagi", "10 Tahun lagi", "1 Abad lagi", "2 Abad lagi", "3 Abad lagi", "20 Tahun lagi", "15 Tahun lagi", "22 Tahun lagi", "28 Tahun lagi", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari", "hari"
        ]
	let random = kapan[Math.floor(Math.random() * kapan.length)]
	if(random == 'hari'){
        	random = `${Math.floor(Math.random() * 30)} Hari lagi`
    	}
	sock.sendMessage(data.id,{text:random},{quoted:data.message})
  }
}
