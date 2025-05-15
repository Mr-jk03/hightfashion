import { Box, keyframes } from "@mui/material";

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const TypingDots = () => {
  return (
    <Box
      sx={{ display: "flex", gap: "4px", alignItems: "center", height: "20px" }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: "6px",
            height: "6px",
            bgcolor: "white",
            borderRadius: "50%",
            animation: `${bounce} 1.2s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </Box>
  );
};
export default TypingDots
