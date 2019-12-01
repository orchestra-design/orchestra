import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { sliderCount } from '../actions'
import {
  Columns,
  Context,
  Footer,
  ImageSlider,
  WorkImageCaption,
  WorkStatement,
  WorkSecondScreen,
} from '../components/blocks'
import { ScrollChild } from '../components/elements'
import {
  constant,
  includes,
  path,
  safeMap,
  uuid,
  unless,
  isNil,
} from '../helpers'
import TemplateWrapper from '../components/layouts'

const WorkTemplate = ({
  data: { work, allworks, seo, allSite, meta },
  location,
}) => {
  const data = path(['data'], work)
  const tags = path(['tags'], work)
  const { body, color, context, image, statement, theme } = data

  return (
    <Fragment>
      <TemplateWrapper
        {...{ allSite }}
        {...{ color }}
        {...{ image }}
        {...{ location }}
        {...{ meta }}
        {...{ seo }}
        title={statement.text}
      >
        <ScrollChild image={image} {...{ theme }} isFirst>
          <WorkStatement {...{ data }} />
        </ScrollChild>
        <ScrollChild theme={'colored'}>
          <WorkSecondScreen {...{ data }} lang={seo.lang} {...{ tags }} />
        </ScrollChild>
        {body ? (
          body.map(section => {
            switch (section.__typename) {
              case 'PrismicWorkBodyImage':
                return (
                  <ScrollChild
                    key={uuid()}
                    items={section.items}
                    theme={'white'}
                    slider={includes('image', section.primary.imgtheme)}
                    sliderId={section.prismicId}
                  >
                    <ImageSlider
                      key={uuid()}
                      items={section.items}
                      primary={section.primary}
                      sliderId={section.prismicId}
                    />
                  </ScrollChild>
                )
              case 'PrismicWorkBodyImageCaption':
                return (
                  <ScrollChild key={uuid()} theme={'white'}>
                    <WorkImageCaption
                      key={uuid()}
                      {...{ color }}
                      items={section.items}
                      primary={section.primary}
                      sliderId={section.prismicId}
                    />
                  </ScrollChild>
                )
              case 'PrismicWorkBodyColumns':
                return (
                  <ScrollChild
                    key={uuid()}
                    theme={'white'}
                    style={{ position: 'relative' }}
                  >
                    <Columns
                      key={uuid()}
                      items={section.items}
                      primary={section.primary}
                      withoutPadding
                    />
                  </ScrollChild>
                )
              default:
                return <Fragment key={uuid()} />
            }
          })
        ) : (
          <ScrollChild theme={'white'} />
        )}
        <ScrollChild theme={'white'}>
          {unless(isNil, () => <Context {...{ allworks }} {...{ context }} />)(
            context[0] && context[0].link
          )}
        </ScrollChild>
        <ScrollChild theme={'white'}>
          <Footer {...{ meta }} />
        </ScrollChild>
      </TemplateWrapper>
    </Fragment>
  )
}

export default compose(
  connect(
    constant,
    { sliderCount }
  ),
  lifecycle({
    componentDidMount() {
      safeMap(section => this.props.sliderCount({ [section.prismicId]: 0 }))(
        this.props.data.work.data.body
      )
    },
  })
)(WorkTemplate)

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!) {
    work: prismicWork(uid: { eq: $slug }, lang: { eq: $lang }) {
      tags
      data {
        title
        statement {
          text
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        color
        theme
        descriptiontext {
          html
        }
        map {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        location
        type
        status
        timeline
        client
        customtags {
          tagtitle
          tagdescription
        }
        context {
          image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          hoverimage {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          link {
            url
            document {
              ...on PrismicWork {
                uid
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicWorkBodyImage {
            prismicId
            primary {
              imgtheme
              imgtext {
                html
              }
            }
            items {
              imgimage {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on PrismicWorkBodyImageCaption {
            prismicId
            primary {
              sicgrid
              sictheme
              sicimage {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 720, quality: 80) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
              siccaption
              sicheader {
                html
              }
            }
            items {
              sictext {
                html
              }
              sictextimage {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 480, quality: 80) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
          ... on PrismicWorkBodyColumns {
            primary {
              coltheme
            }
            items {
              colimage {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 480, quality: 80) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
              coltext {
                html
              }
            }
          }
        }
      }
    }
    allworks: allPrismicWork(filter: { lang: { eq: $lang } }) {
      edges {
        node {
          uid
          data {
            title
            statement {
              text
            }
            color
          }
        }
      }
    }
    seo: prismicWork(uid: { eq: $slug }, lang: { eq: $lang }) {
      uid
      lang
      data {
        seotitle
        seodescription
        seokeywords
        seoimage {
          url
          localFile {
            childImageSharp {
              fixed(width: 1200, height: 630) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
    allSite: allSitePage {
      edges {
        node {
          path
        }
      }
    }
    meta: prismicMeta(lang: { eq: $lang }) {
      ...MetaFragment
    }
  }
`
