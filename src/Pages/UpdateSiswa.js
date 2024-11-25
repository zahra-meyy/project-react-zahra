import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import Swal from 'sweetalert2'; // SweetAlert2 untuk alert

export default function UpdateSiswa() {
  const { id } = useParams(); // Ambil ID dari parameter URL
  const navigate = useNavigate();
  const [formsiswa, setformsiswa] = useState({
    nama: '',
    kelas: '',
    jurusan: '',
    nisn: '',
    asal_sekolah: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3030/siswa/${id}`)
      .then((response) => {
        setformsiswa(response.data); // Isi form dengan data dari API
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.fire({
          title: 'Gagal Memuat Data',
          text: 'Silakan coba lagi.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  }, [id]);

  // Meng-handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformsiswa({ ...formsiswa, [name]: value });
  };

  // Mengirim data yang telah diperbarui ke API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3030/siswa/${id}`, formsiswa)
      .then(() => {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data siswa berhasil diperbarui.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/Siswa'); // Kembali ke halaman siswa setelah konfirmasi
        });
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat memperbarui data.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi',
        });
      });
  };

  // Form untuk mengupdate data
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Update Data Siswa
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nama Siswa"
              name="nama"
              value={formsiswa.nama}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Kelas"
              name="kelas"
              value={formsiswa.kelas}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Jurusan"
              name="jurusan"
              value={formsiswa.jurusan}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="NISN"
              name="nisn"
              value={formsiswa.nisn}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Asal Sekolah"
              name="asal_sekolah"
              value={formsiswa.asal_sekolah}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </form>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/Siswa')}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
