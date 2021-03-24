import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'

function NewCasesByDayChart({ timeline }) {
  return (
    <VictoryChart
      scale={{ x: 'time', y: 'linear' }}
      theme={VictoryTheme.material}
      width={800}
      height={400}
      padding={{ top: 20, left: 80, right: 50, bottom: 50 }}
    >
      <VictoryLine
        x="date"
        y="new_confirmed"
        data={timeline}
        interpolation="basis"
        style={{
          data: { stroke: '#333366' },
        }}
      />
    </VictoryChart>
  )
}

export default NewCasesByDayChart
