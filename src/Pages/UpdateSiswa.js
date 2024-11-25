import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    axios.get(`http://localhost:3030/siswa/${id}`)
      .then(response => {
        setformsiswa(response.data); // Isi form dengan data dari API
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        alert('Gagal memuat data. Silakan coba lagi.');
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
        // Menampilkan SweetAlert setelah data berhasil diperbarui
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data makanan berhasil diperbarui.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/Siswa'); // Kembali ke dashboard setelah konfirmasi
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
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" component="h1" gutterBottom>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/Siswa')}
          >
            Batal
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Simpan
          </Button>
        </Box>
      </form>
    </Box>
  );
}

