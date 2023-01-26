const Loader = () => {
  return (
    <div style={{position: 'fixed', zIndex: '10', width: '100vw', height: '100vh', 
    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
    alignItems: 'center', top: 0, bottom: 0, right: 0, left: 0 }}>
      <img src="../loader.svg" alt="loader" style={{ width: '100px', height: '100px', objectFit: "contain"}}/>
      {/* <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">Transaction is in progress <br /> Please wait...</p> */}
    </div>
  )
}

export default Loader;