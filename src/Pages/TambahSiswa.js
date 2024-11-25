import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function TambahSiswa() {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [formsiswa, setformsiswa] = useState({
    nama: '',
    kelas: '',
    jurusan: '',
    nisn: '',
    asal_sekolah: '',
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformsiswa({ ...formsiswa, [name]: value });
  };

  // Fungsi untuk mengirim data ke server
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3030/siswa', formsiswa) // URL endpoint API
      .then(() => {
        // Menampilkan SweetAlert setelah data berhasil ditambahkan
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data berhasil ditambahkan.',
          icon: 'success',
          confirmButtonText: 'OK', 
        }).then(() => {
          navigate('/Siswa'); // Kembali ke halaman Data Siswa
        });
        
      })
      .catch((error) => {
        console.error('Error adding data:', error);
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menambahkan data.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi',
        });
      });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Tambah
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nama Siswa"
            name="nama"
            value={formsiswa.nama}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Kelas"
            name="kelas"
            value={formsiswa.kelas}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Jurusan"
            name="jurusan"
            value={formsiswa.jurusan}
            onChange={handleChange}
            fullWidth
            required
         />
          <TextField
            label="NISN"
            name="nisn"
            value={formsiswa.nisn}
            onChange={handleChange}
            fullWidth
            required
        />
         <TextField
          label="Asal Sekolah"
          name="asal_sekolah" // Harus sesuai dengan API
          value={formsiswa.asal_sekolah}
          onChange={handleChange}
          fullWidth
          required
        />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/Siswa')} // Arahkan ke Data Siswa
          >
          Batal
          </Button>

            <Button type="submit" variant="contained" color="blue">
              Simpan
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
