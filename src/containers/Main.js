import React from 'react'

import {BreadCrumbs, PageHeading} from 'template/layout'
import {Block} from 'template/components'

export default class Main extends React.Component {
  render() {
    return(
          <div className="page-content">
            <BreadCrumbs childs={[
              {name: 'Dashboard', url: '/', last: true}
            ]}/>
            <PageHeading title="Dashboard" />
              <div className="container-fluid">
                <div>
                  <div className="row">

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        style="warning"
                        additional="12 сайтов в цепи" />
                    </div>

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        style="danger"
                        additional="12 сайтов в цепи" />
                    </div>

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        style="success"
                        additional="12 сайтов в цепи" />
                    </div>

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        style="information"
                        additional="12 сайтов в цепи" />
                    </div>

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        additional="12 сайтов в цепи" />
                    </div>

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        style="purple"
                        additional="12 сайтов в цепи" />
                    </div>

                    <div className="col-md-3">
                      <Block
                        title="Автоматизация"
                        subtitle="еще 24 дня"
                        content="113 статей"
                        style="teal"
                        additional="12 сайтов в цепи" />
                    </div>

                  </div>
                </div>
              </div>
              </div>)
  }
}
