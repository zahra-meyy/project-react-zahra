import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Card, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2'; // SweetAlert2 untuk alert

export default function UpdateGuru() {
  const { id } = useParams(); // Ambil ID dari parameter URL
  const navigate = useNavigate();
  const [formguru, setformguru] = useState({
    nama: '',
    mapel: '',
    nik: '',
    jenis_kelamin: '',
    jabatan: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3030/guru/${id}`)
      .then((response) => {
        setformguru(response.data); // Isi form dengan data dari API
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
    setformguru({ ...formguru, [name]: value });
  };

  // Mengirim data yang telah diperbarui ke API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3030/guru/${id}`, formguru)
      .then(() => {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data guru berhasil diperbarui.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/guru'); // Kembali ke halaman guru setelah konfirmasi
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
            Update Data Guru
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nama Guru"
              name="nama"
              value={formguru.nama}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mapel"
              name="mapel"
              value={formguru.mapel}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="NIK"
              name="nik"
              value={formguru.nik}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            {/* Jenis Kelamin menggunakan Select */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="jenis_kelamin-label">Jenis Kelamin</InputLabel>
              <Select
                labelId="jenis_kelamin-label"
                id="jenis_kelamin"
                name="jenis_kelamin"
                value={formguru.jenis_kelamin}
                onChange={handleChange}
              >
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Jabatan"
              name="jabatan"
              value={formguru.jabatan}
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
            onClick={() => navigate('/guru')}
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
